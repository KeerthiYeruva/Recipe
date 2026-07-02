import { db } from "@/shared/lib/db/sqlite";
import slugify from "slugify";

import type { Meal, PersistedMealInput } from "../types/meal.types";

export async function getMeals(): Promise<Meal[]> {
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export function getMealBySlug(slug: string): Meal | undefined {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as
    | Meal
    | undefined;
}

export function createMeal(meal: PersistedMealInput): void {
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
}

function generateUniqueSlug(title: string): string {
  const baseSlug = slugify(title, { lower: true });
  let slug = baseSlug;
  let count = 1;

  while (db.prepare("SELECT 1 FROM meals WHERE slug = ?").get(slug)) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}
