import { FoodItem } from "./types";

/**
 * Normalizes price to Naira if it was originally in USD (simulated by < 100).
 * Standard exchange rate is 1 USD = 500 NGN for Lagos Island corporate lunch pricing.
 */
export const getNormalizedPrice = (price: number): number => {
  if (price < 100) {
    return Math.round(price * 500);
  }
  return price;
};

/**
 * Formats any price (dollar-based or Naira-based) into a clean Naira display format.
 */
export const formatNaira = (price: number): string => {
  const normalized = getNormalizedPrice(price);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(normalized);
};
