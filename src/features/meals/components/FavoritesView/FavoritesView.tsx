"use client";

import Link from "next/link";

import type { Meal } from "../../types/meal.types";
import { useFavoriteMealSlugs } from "../../hooks/useFavoriteMealSlugs";
import { FAVORITE_MEALS_STORAGE_KEY } from "../../utils/favorites";
import { MealsGrid } from "../MealsGrid/MealsGrid";
import "./favorites-view.scss";

interface FavoritesViewProps {
  meals: Meal[];
}

export function FavoritesView({ meals }: FavoritesViewProps) {
  const favoriteSlugs = useFavoriteMealSlugs();
  const favoriteMeals = meals.filter((meal) => favoriteSlugs.includes(meal.slug));

  return (
    <section className="favorites-view" aria-label="Favorite recipes">
      {favoriteMeals.length > 0 ? (
        <MealsGrid meals={favoriteMeals} />
      ) : (
        <div className="favorites-empty">
          <h2>No favorites saved yet</h2>
          <p>
            Save recipes from the meals page and they will appear here on this device.
          </p>
          <Link href="/meals">Explore Meals</Link>
        </div>
      )}
      <span className="sr-only" aria-live="polite">
        {favoriteSlugs.length} saved recipes from {FAVORITE_MEALS_STORAGE_KEY}
      </span>
    </section>
  );
}
