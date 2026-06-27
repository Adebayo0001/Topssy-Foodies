import { FoodItem, CategoryItem, Review } from "./types";
import poundedYamImg from "./assets/pounded_yam_egusi.jpg";
import friedRiceImg from "./assets/naija_fried_rice.jpg";

const smokyJollofImg = "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=800&q=80";

export const TOP_PICKS: FoodItem[] = [
  {
    id: "smoky-party-jollof",
    title: "Smoky Party Jollof",
    category: "Jollof & Rice",
    description: "Infused with firewood smoke, sweet tatashe peppers, served with flame-grilled turkey & sweet fried plantain.",
    price: 18.50,
    rating: 4.9,
    reviewsCount: 312,
    prepTime: "15 min",
    calories: "580 Cal",
    image: smokyJollofImg
  },
  {
    id: "gourmet-beef-suya",
    title: "Gourmet Beef Suya",
    category: "Suya & Grills",
    description: "Flame-grilled flank steak hand-rubbed with authentic spicy Yaji peanut marinade, served with fresh red onions.",
    price: 12.00,
    rating: 4.8,
    reviewsCount: 198,
    prepTime: "10 min",
    calories: "450 Cal",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pounded-yam-egusi",
    title: "Pounded Yam & Egusi",
    category: "Swallow & Soups",
    description: "Soft, smooth pounded yam paired with rich melon-seed soup simmered with fresh Ugu leaves and assorted meats.",
    price: 22.00,
    rating: 4.9,
    reviewsCount: 245,
    prepTime: "20 min",
    calories: "820 Cal",
    image: poundedYamImg
  }
];

export const PROMO_MEALS: FoodItem[] = [
  {
    id: "ewa-agoyin-bread",
    title: "Ewa Agoyin & Agege Bread",
    category: "Traditional Sides",
    description: "Creamy slow-mashed honey beans with a rich, dark palm-oil pepper sauce, served with warm, pillowy sweet bread.",
    price: 10.50,
    rating: 4.8,
    prepTime: "10 min",
    calories: "520 Cal",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "spicy-goat-asun",
    title: "Fiery Wood-Smoked Asun",
    category: "Suya & Grills",
    description: "Wood-smoked diced goat meat sautéed with fiery habaneros and bell peppers, delivering a burst of authentic local flavor.",
    price: 15.00,
    rating: 4.9,
    prepTime: "12 min",
    calories: "490 Cal",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sweet-golden-puff-puff",
    title: "Crispy Golden Puff Puff",
    category: "Traditional Sides",
    description: "Soft, round, deep-fried dough balls with fragrant nutmeg hints, served hot, fluffy, and lightly dusted with sugar.",
    price: 8.00,
    rating: 4.7,
    prepTime: "8 min",
    calories: "350 Cal",
    image: "https://images.unsplash.com/photo-1530610476181-d83430964d55?auto=format&fit=crop&w=600&q=80",
  }
];

export const FLASH_DEALS: FoodItem[] = [
  {
    id: "naija-fried-rice",
    title: "Naija Fried Rice Platter",
    category: "Jollof & Rice",
    description: "Savory green fried rice tossed with sweet peas, carrots, liver bits, and paired with succulent peppered chicken.",
    price: 11.99,
    originalPrice: 16.00,
    rating: 4.8,
    reviewsCount: 164,
    prepTime: "12 min",
    calories: "610 Cal",
    image: friedRiceImg,
    isFlashDeal: true,
    badge: "25% OFF"
  },
  {
    id: "catfish-pepper-soup",
    title: "Fresh Catfish Pepper Soup",
    category: "Swallow & Soups",
    description: "Piping hot local catfish simmered in an aromatic herbal broth infused with utazi leaves and indigenous healing spices.",
    price: 14.50,
    originalPrice: 20.00,
    rating: 4.9,
    reviewsCount: 112,
    prepTime: "15 min",
    calories: "320 Cal",
    image: poundedYamImg,
    isFlashDeal: true,
    badge: "27% OFF"
  },
  {
    id: "crispy-yam-dun-dun",
    title: "Crispy Yam Fries & Stew",
    category: "Traditional Sides",
    description: "Hand-cut local white yam fries, crisped to golden perfection, served with sweet-spicy scotch bonnet tomato relish.",
    price: 7.50,
    originalPrice: 10.00,
    rating: 4.7,
    reviewsCount: 89,
    prepTime: "10 min",
    calories: "410 Cal",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    isFlashDeal: true,
    badge: "25% OFF"
  },
  {
    id: "chilled-zobo-drink",
    title: "Zobo Hibiscus Elixir",
    category: "Local Drinks",
    description: "Perfectly chilled wild hibiscus flower brew infused with pineapple juice, sweet organic ginger, and cloves.",
    price: 4.00,
    originalPrice: 6.00,
    rating: 4.8,
    reviewsCount: 204,
    prepTime: "5 min",
    calories: "90 Cal",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80",
    isFlashDeal: true,
    badge: "33% OFF"
  }
];

export const CATEGORIES: CategoryItem[] = [
  { id: "cat-jollof", name: "Jollof & Rice", icon: "Flame", count: "40+ Items" },
  { id: "cat-swallow", name: "Swallow & Soups", icon: "Pizza", count: "25+ Items" },
  { id: "cat-grills", name: "Suya & Grills", icon: "Beef", count: "30+ Items" },
  { id: "cat-sides", name: "Traditional Sides", icon: "Salad", count: "20+ Items" },
  { id: "cat-drinks", name: "Local Drinks", icon: "Sparkles", count: "15+ Items" }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Tobi Adebayo",
    role: "Senior Consultant at PwC Lagos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    comment: "Delish saved our executive lunch session! The Smoky Party Jollof is sensational—tastes exactly like authentic local firewood Jollof. Unbelievable quality.",
    rating: 5
  },
  {
    id: "rev-2",
    name: "Chioma Nnaji",
    role: "Director, Chapel Hill Denham",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    comment: "The Pounded Yam was so smooth and soft, and the Egusi soup had that perfect native aroma. Highly recommended for premium Nigerian meals in Lagos.",
    rating: 5
  },
  {
    id: "rev-3",
    name: "Kelechi Okafor",
    role: "Engineering Director at Moniepoint",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    comment: "Simply the most authentic Asun and Suya in town! Beautiful spice level and very fast delivery. Delish is easily our daily choice now.",
    rating: 5
  }
];
