import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs/promises";

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

// Function to generate a unique slug
function generateUniqueSlug(title: string): string {
  let slug = slugify(title, { lower: true });
  let count = 1;
  while (db.prepare("SELECT 1 FROM meals WHERE slug = ?").get(slug)) {
    slug = `${slugify(title, { lower: true })}-${count}`;
    count++;
  }
  return slug;
}

export async function saveMeal(meal: any): Promise<void> {
  meal.slug = generateUniqueSlug(meal.title);
  meal.instructions = xss(meal.instructions);

  // Handle image saving
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const filePath = `public/images/${fileName}`;

  try {
    const bufferedImage = await meal.image.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bufferedImage));
    meal.image = `/images/${fileName}`; // Update meal.image to be the file path string
  } catch (error: any) {
    throw new Error("Image not saved: " + error.message);
  }

  // Save meal to database
  db.prepare(
    `
    INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES (
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
    `
  ).run({
    slug: meal.slug,
    title: meal.title,
    image: meal.image, // Ensure this is the file path string
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
  });
}
