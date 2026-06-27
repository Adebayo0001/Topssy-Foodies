import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { TOP_PICKS, PROMO_MEALS, FLASH_DEALS } from "./data";

export async function seedDatabaseIfNeeded() {
  try {
    const menuColRef = collection(db, "menuItems");
    const snapshot = await getDocs(menuColRef);
    if (snapshot.empty) {
      console.log("Seeding menu items to Firestore...");
      const allItems = [...TOP_PICKS, ...PROMO_MEALS, ...FLASH_DEALS];
      for (const item of allItems) {
        await addDoc(menuColRef, {
          id: item.id,
          title: item.title,
          name: item.title, // Support both 'name' (user spec) and 'title' (app's existing type)
          category: item.category,
          description: item.description,
          price: item.price,
          rating: item.rating,
          reviewsCount: item.reviewsCount || Math.floor(Math.random() * 200) + 50,
          image: item.image,
          imageUrl: item.image, // Support both 'image' and 'imageUrl'
          prepTime: item.prepTime || "15 min",
          calories: item.calories || "450 Cal",
          originalPrice: item.originalPrice || null,
          hasDiscount: !!item.originalPrice,
          isFlashDeal: !!item.isFlashDeal,
          isVegetarian: !!item.isVegetarian,
          badge: item.badge || ""
        });
      }
      console.log("Seeding menu items successful!");
    }
  } catch (error) {
    console.error("Error seeding database: ", error);
  }
}
