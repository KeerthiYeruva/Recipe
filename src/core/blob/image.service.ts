/**
 * Optional: Vercel Blob Image Service
 * 
 * Use this if you want to store images in Vercel Blob instead of public/images.
 * This provides persistent storage across Vercel deployments.
 * 
 * Installation:
 * npm install @vercel/blob
 * 
 * Environment Variable:
 * BLOB_READ_WRITE_TOKEN=your_token_from_vercel_dashboard
 */

import { put, del } from "@vercel/blob";
import slugify from "slugify";

export interface UploadedImage {
  url: string;
  filename: string;
}

export async function uploadMealImage(
  file: File,
  mealTitle: string
): Promise<UploadedImage> {
  try {
    // Create unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `${slugify(mealTitle, { lower: true })}-${timestamp}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(`meals/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return {
      url: blob.url,
      filename: blob.pathname,
    };
  } catch (error) {
    console.error("Failed to upload image to Blob:", error);
    throw new Error("Failed to upload meal image");
  }
}

export async function deleteMealImage(blobPathname: string): Promise<void> {
  try {
    await del(blobPathname);
  } catch (error) {
    console.error("Failed to delete image from Blob:", error);
    throw new Error("Failed to delete meal image");
  }
}

/**
 * Usage in meal.service.ts:
 * 
 * import { uploadMealImage } from "@/core/blob/image.service";
 * 
 * export async function saveMeal(meal: CreateMealInput): Promise<void> {
 *   const safeInstructions = xss(meal.instructions);
 *   const { url } = await uploadMealImage(meal.image, meal.title);
 * 
 *   await createMeal({
 *     ...meal,
 *     instructions: safeInstructions,
 *     image: url,
 *   });
 * }
 */
