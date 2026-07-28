import type { MetadataRoute } from "next";

import { getMeals } from "@/features/meals/repositories/meal.repository";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const meals = await getMeals();

  const mealRoutes = meals.map((meal) => ({
    url: `${BASE_URL}/meals/${meal.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/meals`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/favorites`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/community`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/meals/share`,
      lastModified: new Date(),
    },
    ...mealRoutes,
  ];
}
