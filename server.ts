import express from "express";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, updateDoc, getDoc, collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Load env variables
dotenv.config();

const PORT = 3000;

// Initialize Firebase client SDK on Node server
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyBhhN-BkD3SeiwwRNS8E9PXEsB1YICK2s8",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "gen-lang-client-0755965177.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "gen-lang-client-0755965177",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "gen-lang-client-0755965177.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "504849688518",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:504849688518:web:9821f08a2e6c195b6bf4c7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = initializeFirestore(firebaseApp, {
  databaseId: process.env.VITE_FIREBASE_DATABASE_ID || "ai-studio-topssyfoodies-949bde9c-dda6-4cff-8074-c17520df0286"
} as any);

async function startServer() {
  const app = express();

  // Simple Request Logger to debug image loading issues
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`[HTTP] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    });
    next();
  });

  // Middleware for parsing JSON bodies
  // Webhook needs raw body for signature verification in real systems, 
  // but let's parse json and handle signature calculation on parsed string.
  app.use(express.json());

  // 1. Initialize Paystack Transaction
  app.post("/api/paystack/initialize", async (req, res) => {
    try {
      const { email, amount, orderId } = req.body;
      
      if (!email || !amount || !orderId) {
        return res.status(400).json({ error: "Missing required fields (email, amount, orderId)" });
      }

      // Convert amount to kobo (Paystack currency unit is kobo)
      // Amount is in Naira. (1 Naira = 100 kobo)
      const amountInKobo = Math.round(amount * 100);
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      const callbackUrl = `${appUrl}/order-tracking?orderId=${orderId}`;

      const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_887e220ba3b2a26c4491799277051b8546b5a32b";

      console.log(`Initializing transaction with Paystack for ${email} of amount NGN ${amount} (Order: ${orderId})`);

      const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          amount: amountInKobo,
          reference: orderId, // Use the order ID as the unique Paystack reference
          callback_url: callbackUrl,
          metadata: {
            orderId,
            custom_filters: {
              recurring: false
            }
          }
        })
      });

      const data = await paystackResponse.json();

      if (!paystackResponse.ok || !data.status) {
        console.error("Paystack Initialization Error: ", data);
        return res.status(500).json({ error: data.message || "Failed to initialize payment with Paystack" });
      }

      // We successfully got Paystack checkout URL and reference
      res.json({
        authorization_url: data.data.authorization_url,
        reference: data.data.reference
      });

    } catch (error: any) {
      console.error("Paystack Initialize Catch Block Error: ", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // 2. Verify Paystack Transaction (Fallback & Direct checking)
  app.get("/api/paystack/verify/:reference", async (req, res) => {
    try {
      const { reference } = req.params;
      const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_887e220ba3b2a26c4491799277051b8546b5a32b";

      console.log(`Verifying Paystack transaction: ${reference}`);

      const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${secretKey}`
        }
      });

      const data = await paystackResponse.json();

      if (!paystackResponse.ok || !data.status) {
        console.error("Paystack Verification Error: ", data);
        return res.status(500).json({ error: data.message || "Failed to verify payment" });
      }

      const transactionData = data.data;

      // Check if transaction was successful
      if (transactionData.status === "success") {
        // Update the order in Firestore to "Order Confirmed"
        const orderRef = doc(db, "orders", reference);
        const orderSnap = await getDoc(orderRef);
        
        if (orderSnap.exists()) {
          const currentStatus = orderSnap.data().status;
          if (currentStatus === "Payment Pending" || currentStatus === "Preparing Your Meal") {
            await updateDoc(orderRef, {
              status: "Order Confirmed",
              paymentReference: reference,
              updatedAt: new Date().toISOString()
            });
            console.log(`Order ${reference} successfully confirmed via verification API`);
          }
        }
        
        return res.json({ verified: true, status: "success", orderId: reference });
      }

      res.json({ verified: false, status: transactionData.status, orderId: reference });

    } catch (error: any) {
      console.error("Paystack Verify Catch Block Error: ", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // 3. Webhook Endpoint
  app.post("/api/paystack/webhook", async (req, res) => {
    try {
      const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_887e220ba3b2a26c4491799277051b8546b5a32b";
      const signature = req.headers["x-paystack-signature"] as string;

      if (!signature) {
        return res.status(401).send("No signature provided");
      }

      // Re-verify payload authenticity
      const hash = crypto
        .createHmac("sha512", secretKey)
        .update(JSON.stringify(req.body))
        .digest("hex");

      if (hash !== signature) {
        console.warn("Paystack Webhook Signature Verification Failed!");
        return res.status(401).send("Invalid signature");
      }

      const event = req.body;
      console.log(`Received verified Paystack webhook event: ${event.event}`);

      if (event.event === "charge.success") {
        const reference = event.data.reference;
        const orderRef = doc(db, "orders", reference);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const currentStatus = orderSnap.data().status;
          if (currentStatus === "Payment Pending") {
            await updateDoc(orderRef, {
              status: "Order Confirmed",
              paymentReference: reference,
              updatedAt: new Date().toISOString()
            });
            console.log(`Order ${reference} successfully confirmed via Paystack Webhook`);
          }
        }
      }

      res.status(200).send("Webhook Handled Successfully");

    } catch (error: any) {
      console.error("Paystack Webhook Catch Block Error: ", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // 4. Newsletter Subscription Cloud Function/API
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      console.log(`Subscribing email to newsletter: ${email}`);

      // Save to subscribers collection in Firestore
      const subscribersCol = collection(db, "subscribers");
      const q = query(subscribersCol, where("email", "==", email.toLowerCase().trim()));
      const snap = await getDocs(q);

      if (snap.empty) {
        await addDoc(subscribersCol, {
          email: email.toLowerCase().trim(),
          subscribedAt: new Date().toISOString()
        });
        console.log(`Newsletter subscription successful for ${email}`);
      }

      res.json({ success: true, message: "Successfully subscribed" });

    } catch (error: any) {
      console.error("Newsletter Subscription Error: ", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // 5. Google Maps Proxy / Placeholder info
  app.get("/api/maps-config", (req, res) => {
    res.json({
      apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyA88981273981273981273-mock-key"
    });
  });

  // Mount Vite development middleware or static production files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for non-api routes for React router
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-Stack Delish server running on http://localhost:${PORT}`);
  });
}

startServer();
