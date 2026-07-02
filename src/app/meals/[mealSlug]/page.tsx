import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMealBySlug } from "@/features/meals/repositories/meal.repository";
import { getMeals } from "@/features/meals/repositories/meal.repository";
import { FavoriteButton } from "@/features/meals/components/FavoriteButton/FavoriteButton";
import { IngredientTools } from "@/features/meals/components/IngredientTools/IngredientTools";
import { MealsGrid } from "@/features/meals/components/MealsGrid/MealsGrid";
import {
  formatInstructionsAsHtml,
  getSharedIngredientCount,
  parseIngredients,
} from "@/features/meals/utils/meal-formatters";
import "./meals-detail.scss";

interface MealsDetailPageProps {
  params: Promise<{
    mealSlug: string;
  }>;
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
  const relatedMeals = allMeals
    .filter((relatedMeal) => relatedMeal.slug !== meal.slug)
    .map((relatedMeal) => ({
      meal: relatedMeal,
      score:
        (relatedMeal.category === meal.category ? 2 : 0) +
        getSharedIngredientCount(meal.ingredients, relatedMeal.ingredients),
    }))
    .filter(({ score }) => score > 0)
    .sort((firstMeal, secondMeal) => secondMeal.score - firstMeal.score)
    .slice(0, 3)
    .map(({ meal: relatedMeal }) => relatedMeal);

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
