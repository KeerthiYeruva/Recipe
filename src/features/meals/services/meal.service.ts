import fs from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";
import xss from "xss";

import { createMeal } from "../repositories/meal.repository";
import type { CreateMealInput } from "../types/meal.types";

export async function saveMeal(meal: CreateMealInput): Promise<void> {
  const safeInstructions = xss(meal.instructions);
  const imagePath = await saveMealImage(meal.title, meal.image);

  await createMeal({
    ...meal,
    instructions: safeInstructions,
    image: imagePath,
  });
}

async function saveMealImage(title: string, image: File): Promise<string> {
  const extension = image.name.split(".").pop();
  const fileName = `${slugify(title, { lower: true })}.${extension}`;
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const filePath = path.join(imagesDirectory, fileName);

  await fs.mkdir(imagesDirectory, { recursive: true });
  const bufferedImage = await image.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(bufferedImage));

  return `/images/${fileName}`;
}
