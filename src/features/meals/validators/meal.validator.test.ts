import { describe, expect, it } from "vitest";

import { validateMealForm } from "./meal.validator";
import type { MealFormInput } from "../types/meal.types";

const validMeal = (): MealFormInput => ({
  title: "  Oats Bowl  ",
  summary: "Fast breakfast",
  instructions: "Mix and serve",
  image: new File(["image"], "oats.jpg", { type: "image/jpeg" }),
  category: "Breakfast",
  prep_time: "5",
  servings: "2",
  difficulty: "Easy",
  calories: "320",
  creator: "Keerthi",
  creator_email: "keerthi@example.com",
});

describe("validateMealForm", () => {
  it("returns normalized data for a valid meal", () => {
    const result = validateMealForm(validMeal());

    expect(result.errors).toEqual([]);
    expect(result.data).toMatchObject({
      title: "Oats Bowl",
      prep_time: 5,
      servings: 2,
      calories: 320,
      creator_email: "keerthi@example.com",
    });
  });

  it("collects validation errors for missing and invalid fields", () => {
    const result = validateMealForm({
      ...validMeal(),
      title: "",
      image: null,
      prep_time: "0",
      creator_email: "not-an-email",
    });

    expect(result.data).toBeUndefined();
    expect(result.errors).toEqual(
      expect.arrayContaining([
        "Title is required.",
        "Prep time must be a positive number.",
        "Invalid email format.",
        "Image is required.",
      ])
    );
  });
});
