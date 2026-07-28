import type { Meal } from "../types/meal.types";
import type { MealQuickFilter } from "../constants/meal.constants";

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
    const searchableText = [meal.title, meal.creator, meal.category, meal.ingredients]
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

export function filterByQuickFilter(
  meals: Meal[],
  quickFilter: MealQuickFilter
): Meal[] {
  if (quickFilter === "under-10") {
    return meals.filter((meal) => meal.prep_time <= 10);
  }

  if (quickFilter === "easy") {
    return meals.filter((meal) => meal.difficulty === "Easy");
  }

  if (quickFilter === "under-300") {
    return meals.filter((meal) => meal.calories <= 300);
  }

  return meals;
}
