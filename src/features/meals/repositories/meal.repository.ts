import { db } from "@/core/db/sqlite";
import slugify from "slugify";

import type { Meal, PersistedMealInput } from "../types/meal.types";

export async function getMeals(): Promise<Meal[]> {
  try {
    return db.prepare("SELECT * FROM meals").all() as Meal[];
  } catch {
    // Database may not exist (e.g., on Vercel's ephemeral filesystem)
    return [];
  }
}

export function getMealBySlug(slug: string): Meal | undefined {
  try {
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal | undefined;
  } catch {
    // Database may not exist
    return undefined;
  }
}

export function createMeal(meal: PersistedMealInput): void {
  try {
    const slug = generateUniqueSlug(meal.title);

    db.prepare(
      `
      INSERT INTO meals (slug, title, image, summary, instructions, ingredients, category, prep_time, servings, difficulty, calories, creator, creator_email) VALUES (
        @slug,
        @title,
        @image,
        @summary,
        @instructions,
        @ingredients,
        @category,
        @prep_time,
        @servings,
        @difficulty,
        @calories,
        @creator,
        @creator_email
      )
      `
    ).run({
      slug,
      title: meal.title,
      image: meal.image,
      summary: meal.summary,
      instructions: meal.instructions,
      ingredients: meal.ingredients || JSON.stringify([]),
      category: meal.category,
      prep_time: meal.prep_time,
      servings: meal.servings,
      difficulty: meal.difficulty,
      calories: meal.calories,
      creator: meal.creator,
      creator_email: meal.creator_email,
    });
  } catch {
    // Database may not exist or be writable (e.g., on Vercel)
    // Error will be caught in saveMeal service
    throw new Error("Failed to save meal to database");
  }
}

function generateUniqueSlug(title: string): string {
  try {
    const baseSlug = slugify(title, { lower: true });
    let slug = baseSlug;
    let count = 1;

    while (db.prepare("SELECT 1 FROM meals WHERE slug = ?").get(slug)) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    return slug;
  } catch {
    // Database may not exist - return base slug
    return slugify(title, { lower: true });
  }
}
