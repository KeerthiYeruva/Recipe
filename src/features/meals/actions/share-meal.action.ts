"use server";

import { saveMeal } from "../services/meal.service";
import { validateMealForm } from "../validators/meal.validator";
import type { MealFormInput } from "../types/meal.types";
import type { FormState } from "@/shared/types/form.types";

const isVercelDeployment = Boolean(process.env.VERCEL);

export async function shareMealAction(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const meal: MealFormInput = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    category: formData.get("category"),
    prep_time: formData.get("prep_time"),
    servings: formData.get("servings"),
    difficulty: formData.get("difficulty"),
    calories: formData.get("calories"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  const validation = validateMealForm(meal);

  if (validation.errors.length > 0 || !validation.data) {
    return { status: "error", errors: validation.errors };
  }

  if (isVercelDeployment) {
    return {
      status: "success",
      errors: [],
      message:
        "Demo submission received. On Vercel, recipes are not saved permanently because this app uses local SQLite and file uploads.",
    };
  }

  try {
    await saveMeal(validation.data);
    return {
      status: "success",
      errors: [],
      message: "Recipe shared successfully! Thank you for contributing.",
    };
  } catch {
    return {
      status: "error",
      errors: ["An unexpected error occurred while saving the meal."],
    };
  }
}
