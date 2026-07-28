import "./meals.scss";
import Link from "next/link";

import { getMeals } from "@/features/meals/repositories/meal.repository";
import { MealsExplorer } from "@/features/meals/components/MealsExplorer/MealsExplorer";
import {
  MEAL_CATEGORIES,
  type MealCategory,
} from "@/features/meals/constants/meal.constants";

interface MealsPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

const MealsPage = async ({ searchParams }: MealsPageProps) => {
  const meals = await getMeals();
  const quickMeals = meals.filter((meal) => meal.prep_time <= 10).length;
  const resolvedSearchParams = await searchParams;
  const requestedCategory = resolvedSearchParams?.category;
  const initialCategory =
    requestedCategory && MEAL_CATEGORIES.includes(requestedCategory as MealCategory)
      ? requestedCategory
      : "All";

  return (
    <>
      <header className="header-m">
        <div>
          <h1>Quick and Healthy Recipes</h1>
          <p>Explore delicious recipes you can prepare in 10 minutes or less.</p>
        </div>
        <div className="header-m__aside">
          <dl>
            <div>
              <dt>Total recipes</dt>
              <dd>{meals.length}</dd>
            </div>
            <div>
              <dt>Quick meals</dt>
              <dd>{quickMeals}</dd>
            </div>
          </dl>
          <p className="cta">
            <Link
              href="/meals/share"
              aria-label="Share your favorite recipe with our community"
            >
              Share your favorite recipe
            </Link>
          </p>
        </div>
      </header>
      <section className="main" aria-label="Recipes">
        <MealsExplorer meals={meals} initialCategory={initialCategory} />
      </section>
    </>
  );
};
export default MealsPage;
