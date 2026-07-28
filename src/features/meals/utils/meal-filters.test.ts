import { describe, expect, it } from "vitest";

import type { Meal } from "../types/meal.types";
import { filterByQuickFilter, filterBySearchTerm } from "./meal-filters";

const meals: Meal[] = [
  {
    id: 1,
    title: "Overnight Oats",
    slug: "overnight-oats",
    image: "/images/oats.jpg",
    summary: "Easy breakfast",
    instructions: "Mix and chill",
    ingredients: JSON.stringify(["oats", "chia seeds", "milk"]),
    category: "Breakfast",
    prep_time: 5,
    servings: 2,
    difficulty: "Easy",
    calories: 320,
    creator: "Keerthi",
    creator_email: "keerthi@example.com",
  },
  {
    id: 2,
    title: "Tomato Salad",
    slug: "tomato-salad",
    image: "/images/salad.jpg",
    summary: "Fresh lunch",
    instructions: "Slice and serve",
    ingredients: JSON.stringify(["tomato", "cucumber", "olive oil"]),
    category: "Lunch",
    prep_time: 8,
    servings: 1,
    difficulty: "Easy",
    calories: 180,
    creator: "Ranga",
    creator_email: "ranga@example.com",
  },
];

describe("meal filters", () => {
  it("searches recipes by ingredient text", () => {
    expect(filterBySearchTerm(meals, "chia")).toEqual([meals[0]]);
  });

  it("filters recipes by quick filter criteria", () => {
    expect(filterByQuickFilter(meals, "under-300")).toEqual([meals[1]]);
    expect(filterByQuickFilter(meals, "under-10")).toEqual(meals);
    expect(filterByQuickFilter(meals, "easy")).toEqual(meals);
  });
});
