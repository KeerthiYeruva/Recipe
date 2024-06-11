"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// Simple email validation function
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Function to validate meal data
const validateMeal = (meal: any): string[] => {
  const errors: string[] = [];

  if (!meal.title) errors.push("Title is required.");
  if (!meal.summary) errors.push("Summary is required.");
  if (!meal.instructions) errors.push("Instructions are required.");
  if (!meal.image) errors.push("Image is required.");
  if (!meal.creator) errors.push("Creator name is required.");
  if (!meal.creator_email) {
    errors.push("Creator email is required.");
  } else if (!validateEmail(meal.creator_email)) {
    errors.push("Invalid email format.");
  }

  return errors;
};

const shareMeal = async (prevstate: any, formData: any) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  const errors = validateMeal(meal);

  if (errors.length > 0) {
    return { status: "error", errors };
  }

  try {
    await saveMeal(meal);
    return { status: "success" };
  } catch (error) {
    return {
      status: "error",
      errors: ["An unexpected error occurred while saving the meal."],
    };
  }
};

export default shareMeal;
