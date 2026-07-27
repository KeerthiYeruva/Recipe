import type { Meal } from "../types/meal.types";

export function filterByCategory(meals: Meal[], category: string | null): Meal[] {
  if (!category || category === "All") {
    return meals;
  }
  return meals.filter((meal) => meal.category === category);
}

export function filterBySearchTerm(meals: Meal[], searchTerm: string): Meal[] {
  if (!searchTerm) {
    return meals;
  }

  const normalizedSearch = searchTerm.toLowerCase();

  return meals.filter((meal) => {
    const searchableText = [meal.title, meal.creator, meal.category]
      .join(" ")
      .toLowerCase();
    return searchableText.includes(normalizedSearch);
  });
}

export function filterMeals(
  meals: Meal[],
  category: string | null,
  searchTerm: string
): Meal[] {
  let filtered = filterByCategory(meals, category);
  filtered = filterBySearchTerm(filtered, searchTerm);
  return filtered;
}
