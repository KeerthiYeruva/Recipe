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
    creator: string;
    creator_email: string;
  }
}
