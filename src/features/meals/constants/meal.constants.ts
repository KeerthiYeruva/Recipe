export const MEAL_CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snacks",
  "Drinks",
] as const;

export type MealCategory = (typeof MEAL_CATEGORIES)[number];

export const MEAL_DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export type MealDifficulty = (typeof MEAL_DIFFICULTIES)[number];

export const MEAL_SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Recipe Name A-Z", value: "title-asc" },
  { label: "Recipe Name Z-A", value: "title-desc" },
] as const;

export type MealSortOption = (typeof MEAL_SORT_OPTIONS)[number]["value"];

export const MEAL_QUICK_FILTERS = [
  { label: "Under 10 min", value: "under-10" },
  { label: "Easy", value: "easy" },
  { label: "Under 300 kcal", value: "under-300" },
] as const;

export type MealQuickFilter = "all" | (typeof MEAL_QUICK_FILTERS)[number]["value"];
