import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getMealBySlug } from "@/features/meals/repositories/meal.repository";
import { getMeals } from "@/features/meals/repositories/meal.repository";
import { getRelatedMeals } from "@/features/meals/services/relatedMeals.service";
import { FavoriteButton } from "@/features/meals/components/FavoriteButton/FavoriteButton";
import { IngredientTools } from "@/features/meals/components/IngredientTools/IngredientTools";
import { MealsGrid } from "@/features/meals/components/MealsGrid/MealsGrid";
import {
  formatInstructionsAsHtml,
  parseIngredients,
} from "@/features/meals/utils/meal-formatters";
import "./meals-detail.scss";

interface MealsDetailPageProps {
  params: Promise<{
    mealSlug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const meals = await getMeals();

  return meals.map((meal) => ({
    mealSlug: meal.slug,
  }));
}

export async function generateMetadata({
  params,
}: MealsDetailPageProps): Promise<Metadata> {
  const { mealSlug } = await params;
  const meal = getMealBySlug(mealSlug);

  if (!meal) {
    return {
      title: "Recipe Not Found",
    };
  }

  return {
    title: `${meal.title} | Recipe App`,
    description: meal.summary,
  };
}

export default async function MealsDetailPage({ params }: MealsDetailPageProps) {
  const { mealSlug } = await params;
  const meal = getMealBySlug(mealSlug);

  if (!meal) {
    notFound();
  }

  const ingredients = parseIngredients(meal.ingredients);
  const instructions = formatInstructionsAsHtml(meal.instructions);
  const allMeals = await getMeals();
  const relatedMeals = getRelatedMeals(meal, allMeals, 3);

  return (
    <>
      <div className="back-button-container">
        <Link href="/meals" className="back-button" aria-label="Back to all recipes">
          ← Back to Recipes
        </Link>
      </div>
      <header className="header-md">
        <div className="image-md">
          {meal.image && typeof meal.image === "string" ? (
            <Image src={meal.image} fill alt={`${meal.title} - a delicious recipe`} />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="headerText">
          <h1>{meal.title}</h1>
          <p className="creator-md">
            by <strong>{meal.creator}</strong>
          </p>
          <p className="summary">{meal.summary}</p>
          <div className="detail-tools">
            <FavoriteButton slug={meal.slug} title={meal.title} />
          </div>
          <dl className="recipe-meta">
            <div>
              <dt>Category</dt>
              <dd>{meal.category}</dd>
            </div>
            <div>
              <dt>Prep Time</dt>
              <dd>{meal.prep_time} mins</dd>
            </div>
            <div>
              <dt>Servings</dt>
              <dd>{meal.servings}</dd>
            </div>
            <div>
              <dt>Difficulty</dt>
              <dd>{meal.difficulty}</dd>
            </div>
            <div>
              <dt>Calories</dt>
              <dd>{meal.calories} kcal</dd>
            </div>
          </dl>
        </div>
      </header>

      {ingredients.length > 0 && (
        <section aria-label="Recipe ingredients" className="ingredients-section">
          <h2>Ingredients</h2>
          <IngredientTools ingredients={ingredients} />
        </section>
      )}

      <section aria-label="Recipe instructions">
        <h2 className="sr-only">Instructions</h2>
        <p
          className="instructions-md"
          dangerouslySetInnerHTML={{ __html: instructions }}
        />
      </section>

      {relatedMeals.length > 0 && (
        <section className="related-recipes" aria-label="Related recipes">
          <h2>You may also like</h2>
          <MealsGrid meals={relatedMeals} />
        </section>
      )}
    </>
  );
}
