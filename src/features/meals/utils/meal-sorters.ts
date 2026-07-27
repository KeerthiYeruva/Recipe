import type { Meal } from "../types/meal.types";
import type { MealSortOption } from "../constants/meal.constants";

export function sortMeals(meals: Meal[], sortBy: MealSortOption): Meal[] {
  const sorted = [...meals];

  if (sortBy === "oldest") {
    return sorted.sort((firstMeal, secondMeal) => firstMeal.id - secondMeal.id);
  }

  if (sortBy === "title-asc") {
    return sorted.sort((firstMeal, secondMeal) =>
      firstMeal.title.localeCompare(secondMeal.title)
    );
  }

  if (sortBy === "title-desc") {
    return sorted.sort((firstMeal, secondMeal) =>
      secondMeal.title.localeCompare(firstMeal.title)
    );
  }

  // newest
  return sorted.sort((firstMeal, secondMeal) => secondMeal.id - firstMeal.id);
}
