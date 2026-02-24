// types/types.d.ts

// Ensure this is treated as a module
export {};

// Define the Meal interface
declare global {
  interface Meal {
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

  interface Image {
    size: number;
    type: string;
    name: string;
    lastModified: number;
  }

  interface FormState {
    status: "" | "error" | "success";
    errors: string[];
  }
}
