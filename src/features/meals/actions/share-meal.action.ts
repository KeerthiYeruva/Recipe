"use server";

import { saveMeal } from "../services/meal.service";
import { validateMealForm } from "../validators/meal.validator";
import type { MealFormInput } from "../types/meal.types";
import type { FormState } from "@/shared/types/form.types";

export async function shareMealAction(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const meal: MealFormInput = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  const validation = validateMealForm(meal);

  if (validation.errors.length > 0 || !validation.data) {
    return { status: "error", errors: validation.errors };
  }

  try {
    await saveMeal(validation.data);
    return { status: "success", errors: [] };
  } catch {
    return {
      status: "error",
      errors: ["An unexpected error occurred while saving the meal."],
    };
  }
}
