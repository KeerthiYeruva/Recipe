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
import { parseIngredients } from "@/features/meals/utils/meal-formatters";
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
    title: `${meal.title} | Recipes`,
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
  const instructionSteps = meal.instructions
    .split(/\n+/)
    .map((step) => step.trim())
    .filter(Boolean);
  const allMeals = await getMeals();
  const relatedMeals = getRelatedMeals(meal, allMeals, 3);

  return (
    <div className="recipe-detail">
      <div className="back-button-container page-shell">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/meals">Recipes</Link>
          <span aria-hidden="true">/</span>
          <span>{meal.title}</span>
        </nav>
      </div>
      <header className="header-md page-shell">
        <div className="image-md">
          {meal.image && typeof meal.image === "string" ? (
            <Image
              src={meal.image}
              fill
              alt={`${meal.title} - a delicious recipe`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="headerText">
          <span className="eyebrow">{meal.category}</span>
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
        <section
          aria-label="Recipe ingredients"
          className="ingredients-section page-shell"
        >
          <div className="section-block__header">
            <div>
              <h2>Ingredients</h2>
              <p className="supporting-text">
                Adjust servings and check items off as you cook.
              </p>
            </div>
            <p>
              Serving-size updates apply only to quantities that can be parsed safely.
            </p>
          </div>
          <IngredientTools ingredients={ingredients} servings={meal.servings} />
        </section>
      )}

      <section
        aria-label="Recipe instructions"
        className="instructions-section page-shell"
      >
        <div className="section-block__header">
          <div>
            <h2>Instructions</h2>
            <p className="supporting-text">Follow each step at your own pace.</p>
          </div>
        </div>
        <ol className="instructions-md">
          {instructionSteps.map((step, index) => (
            <li key={`${step}-${index}`}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {relatedMeals.length > 0 && (
        <section className="related-recipes page-section" aria-label="Related recipes">
          <div className="section-block__header">
            <div>
              <h2>You May Also Like</h2>
              <p className="supporting-text">
                More quick recipes with similar ingredients or categories.
              </p>
            </div>
          </div>
          <MealsGrid meals={relatedMeals} />
        </section>
      )}
    </div>
  );
}
