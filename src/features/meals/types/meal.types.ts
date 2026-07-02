export interface Meal {
  id: number;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  ingredients: string;
  creator: string;
  creator_email: string;
}

export interface MealFormInput {
  title: FormDataEntryValue | null;
  summary: FormDataEntryValue | null;
  instructions: FormDataEntryValue | null;
  image: FormDataEntryValue | null;
  creator: FormDataEntryValue | null;
  creator_email: FormDataEntryValue | null;
}

export interface CreateMealInput {
  title: string;
  summary: string;
  instructions: string;
  image: File;
  creator: string;
  creator_email: string;
  ingredients?: string;
}

export type PersistedMealInput = Omit<CreateMealInput, "image"> & {
  image: string;
};
