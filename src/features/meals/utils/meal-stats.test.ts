import { describe, expect, it } from "vitest";

import type { Meal } from "../types/meal.types";
import { getMealCategorySummaries, getQuickestPrepTime } from "./meal-stats";

const createMeal = (overrides: Partial<Meal>): Meal => ({
  id: 1,
  title: "Overnight Oats",
  slug: "overnight-oats",
  image: "/images/oats.jpg",
  summary: "A fast breakfast.",
  instructions: "Mix and chill.",
  ingredients: JSON.stringify(["Oats", "Milk"]),
  category: "Breakfast",
  prep_time: 5,
  servings: 1,
  difficulty: "Easy",
  calories: 250,
  creator: "Recipe Team",
  creator_email: "recipes@example.com",
  ...overrides,
});

describe("meal stats", () => {
  it("summarizes meals by category in first-seen order", () => {
    const meals = [
      createMeal({ id: 1, title: "Overnight Oats", category: "Breakfast" }),
      createMeal({ id: 2, title: "Pasta Bowl", category: "Dinner" }),
      createMeal({ id: 3, title: "Smoothie", category: "Breakfast" }),
    ];

    expect(getMealCategorySummaries(meals)).toEqual([
      { name: "Breakfast", count: 2, meal: "Overnight Oats" },
      { name: "Dinner", count: 1, meal: "Pasta Bowl" },
    ]);
  });

  it("returns the quickest prep time when meals exist", () => {
    expect(
      getQuickestPrepTime([
        createMeal({ prep_time: 12 }),
        createMeal({ prep_time: 4 }),
        createMeal({ prep_time: 8 }),
      ])
    ).toBe(4);
  });

  it("returns null for quickest prep time when no meals exist", () => {
    expect(getQuickestPrepTime([])).toBeNull();
  });
});