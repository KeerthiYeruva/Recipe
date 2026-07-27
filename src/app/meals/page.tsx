import "./meals.scss";
import Link from "next/link";

import { getMeals } from "@/features/meals/repositories/meal.repository";
import { MealsExplorer } from "@/features/meals/components/MealsExplorer/MealsExplorer";

const MealsPage = async () => {
  const meals = await getMeals();
  const quickMeals = meals.filter((meal) => meal.prep_time <= 10).length;

  return (
    <>
      <header className="header-m">
        <div>
          <span className="eyebrow">Recipe library</span>
          <h1>
            Find a recipe that fits the time you have, not just the craving you feel.
          </h1>
          <p>
            Explore polished quick meals, lighter desserts, and repeat-worthy snacks with
            search, filters, and browser-saved favorites.
          </p>
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
        <MealsExplorer meals={meals} />
      </section>
    </>
  );
};
export default MealsPage;
