export interface Meal {
  id: number;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  ingredients: string;
  category: string;
  prep_time: number;
  servings: number;
  difficulty: string;
  calories: number;
  creator: string;
  creator_email: string;
}

export interface MealFormInput {
  title: FormDataEntryValue | null;
  summary: FormDataEntryValue | null;
  instructions: FormDataEntryValue | null;
  image: FormDataEntryValue | null;
  category: FormDataEntryValue | null;
  prep_time: FormDataEntryValue | null;
  servings: FormDataEntryValue | null;
  difficulty: FormDataEntryValue | null;
  calories: FormDataEntryValue | null;
  creator: FormDataEntryValue | null;
  creator_email: FormDataEntryValue | null;
}

export interface CreateMealInput {
  title: string;
  summary: string;
  instructions: string;
  image: File;
  category: string;
  prep_time: number;
  servings: number;
  difficulty: string;
  calories: number;
  creator: string;
  creator_email: string;
  ingredients?: string;
}

export type PersistedMealInput = Omit<CreateMealInput, "image"> & {
  image: string;
};
