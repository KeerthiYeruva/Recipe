import type { Meal } from "../types/meal.types";

export interface MealCategorySummary {
  name: string;
  count: number;
  meal: string;
}

export function getMealCategorySummaries(meals: Meal[]): MealCategorySummary[] {
  const summariesByCategory = new Map<string, MealCategorySummary>();

  meals.forEach((meal) => {
    const existingSummary = summariesByCategory.get(meal.category);

    if (existingSummary) {
      existingSummary.count += 1;
      return;
    }

    summariesByCategory.set(meal.category, {
      name: meal.category,
      count: 1,
      meal: meal.title,
    });
  });

  return Array.from(summariesByCategory.values());
}

export function getQuickestPrepTime(meals: Meal[]): number | null {
  if (meals.length === 0) {
    return null;
  }

  return Math.min(...meals.map((meal) => meal.prep_time));
}