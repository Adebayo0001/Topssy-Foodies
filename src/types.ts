export interface FoodItem {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  image: string;
  prepTime: string; // e.g. "15 min"
  calories: string; // e.g. "450 Cal"
  originalPrice?: number;
  hasDiscount?: boolean;
  isFlashDeal?: boolean;
  isVegetarian?: boolean;
  badge?: string; // e.g. "Up to 40%", "LIMITED TIME", "MUST TRY"
}

export interface CartItem {
  product: FoodItem;
  quantity: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string; // Lucide icon name, or JSX component
  count: string; // e.g. "120+ Items"
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  role?: string;
}
