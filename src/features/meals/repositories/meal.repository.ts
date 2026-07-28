import { query, queryOne, execute } from "@/core/db/postgres";
import slugify from "slugify";

import type { Meal, PersistedMealInput } from "../types/meal.types";

export async function getMeals(): Promise<Meal[]> {
  try {
    return await query<Meal>(
      "SELECT id, title, slug, image, summary, instructions, ingredients, category, prep_time, servings, difficulty, calories, creator, creator_email FROM meals ORDER BY created_at DESC"
    );
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    return [];
  }
}

export async function getMealBySlug(slug: string): Promise<Meal | null> {
  try {
    return await queryOne<Meal>(
      "SELECT id, title, slug, image, summary, instructions, ingredients, category, prep_time, servings, difficulty, calories, creator, creator_email FROM meals WHERE slug = $1",
      [slug]
    );
  } catch (error) {
    console.error("Failed to fetch meal by slug:", error);
    return null;
  }
}

export async function createMeal(meal: PersistedMealInput): Promise<void> {
  try {
    const slug = await generateUniqueSlug(meal.title);

    await execute(
      `
      INSERT INTO meals (
        title, slug, image, summary, instructions, ingredients,
        category, prep_time, servings, difficulty, calories, creator, creator_email
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `,
      [
        meal.title,
        slug,
        meal.image,
        meal.summary,
        meal.instructions,
        meal.ingredients || JSON.stringify([]),
        meal.category,
        meal.prep_time,
        meal.servings,
        meal.difficulty,
        meal.calories,
        meal.creator,
        meal.creator_email,
      ]
    );
  } catch (error) {
    console.error("Failed to create meal:", error);
    throw new Error("Failed to save meal to database");
  }
}

async function generateUniqueSlug(title: string): Promise<string> {
  try {
    const baseSlug = slugify(title, { lower: true });
    let slug = baseSlug;
    let count = 1;

    while (true) {
      const existing = await queryOne<{ slug: string }>(
        "SELECT slug FROM meals WHERE slug = $1 LIMIT 1",
        [slug]
      );

      if (!existing) {
        break;
      }

      slug = `${baseSlug}-${count}`;
      count++;
    }

    return slug;
  } catch (error) {
    console.error("Failed to generate unique slug:", error);
    return slugify(title, { lower: true });
  }
}
