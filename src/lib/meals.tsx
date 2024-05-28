import sql from "better-sqlite3";

const db = sql("meals.db");

// Function to get all meals
export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

// Function to get a single meal by slug
export function getMeal(slug: string): Meal | undefined {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as
    | Meal
    | undefined;
}
