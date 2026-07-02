import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMealBySlug } from "@/features/meals/repositories/meal.repository";
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

export default async function MealsDetailPage({ params }: MealsDetailPageProps) {
  const { mealSlug } = await params;
  const meal = getMealBySlug(mealSlug);

  if (!meal) {
    notFound();
  }

  const ingredients = parseIngredients(meal.ingredients);
  const instructions = formatInstructionsAsHtml(meal.instructions);

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
        </div>
      </header>

      {ingredients.length > 0 && (
        <section aria-label="Recipe ingredients" className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Recipe instructions">
        <h2 className="sr-only">Instructions</h2>
        <p
          className="instructions-md"
          dangerouslySetInnerHTML={{ __html: instructions }}
        />
      </section>
    </>
  );
}
