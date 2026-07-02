import type { CreateMealInput, MealFormInput } from "../types/meal.types";

interface MealValidationResult {
  data?: CreateMealInput;
  errors: string[];
}

export function validateMealForm(meal: MealFormInput): MealValidationResult {
  const errors: string[] = [];
  const title = getRequiredText(meal.title, "Title is required.", errors);
  const summary = getRequiredText(meal.summary, "Summary is required.", errors);
  const instructions = getRequiredText(
    meal.instructions,
    "Instructions are required.",
    errors
  );
  const category = getRequiredText(meal.category, "Category is required.", errors);
  const difficulty = getRequiredText(meal.difficulty, "Difficulty is required.", errors);
  const prepTime = getRequiredPositiveNumber(
    meal.prep_time,
    "Prep time must be a positive number.",
    errors
  );
  const servings = getRequiredPositiveNumber(
    meal.servings,
    "Servings must be a positive number.",
    errors
  );
  const calories = getRequiredPositiveNumber(
    meal.calories,
    "Calories must be a positive number.",
    errors
  );
  const creator = getRequiredText(meal.creator, "Creator name is required.", errors);
  const creatorEmail = getRequiredText(
    meal.creator_email,
    "Creator email is required.",
    errors
  );

  if (creatorEmail && !isValidEmail(creatorEmail)) {
    errors.push("Invalid email format.");
  }

  if (!(meal.image instanceof File) || meal.image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0 || !(meal.image instanceof File)) {
    return { errors };
  }

  return {
    data: {
      title,
      summary,
      instructions,
      image: meal.image,
      category,
      prep_time: prepTime,
      servings,
      difficulty,
      calories,
      creator,
      creator_email: creatorEmail,
    },
    errors: [],
  };
}

function getRequiredText(
  value: FormDataEntryValue | null,
  message: string,
  errors: string[]
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(message);
    return "";
  }

  return value.trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getRequiredPositiveNumber(
  value: FormDataEntryValue | null,
  message: string,
  errors: string[]
): number {
  const numberValue = typeof value === "string" ? Number(value) : Number.NaN;

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    errors.push(message);
    return 0;
  }

  return numberValue;
}
