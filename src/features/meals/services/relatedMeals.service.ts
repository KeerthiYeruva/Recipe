import type { Meal } from "../types/meal.types";
import { getSharedIngredientCount } from "../utils/meal-formatters";

export function getRelatedMeals(currentMeal: Meal, allMeals: Meal[], limit = 3): Meal[] {
  return allMeals
    .filter((relatedMeal) => relatedMeal.slug !== currentMeal.slug)
    .map((relatedMeal) => ({
      meal: relatedMeal,
      score:
        (relatedMeal.category === currentMeal.category ? 2 : 0) +
        getSharedIngredientCount(currentMeal.ingredients, relatedMeal.ingredients),
    }))
    .filter(({ score }) => score > 0)
    .sort((firstMeal, secondMeal) => secondMeal.score - firstMeal.score)
    .slice(0, limit)
    .map(({ meal: relatedMeal }) => relatedMeal);
}
