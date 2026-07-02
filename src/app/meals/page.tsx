import "./meals.scss";
import Link from "next/link";

import { getMeals } from "@/features/meals/repositories/meal.repository";
import { MealsExplorer } from "@/features/meals/components/MealsExplorer/MealsExplorer";

const MealsPage = async () => {
  const meals = await getMeals();
  return (
    <>
      <header className="header-m">
        <h1>
          Short on time, not on flavor!{" "}
          <span className="highlight-m"> Explore our quick recipes now </span> 🕒
        </h1>
        <p>Choose your favourite recipe and cook it yourself. It&apos;s easy & fun!</p>
        <p className="cta">
          <Link
            href="/meals/share"
            aria-label="Share your favorite recipe with our community"
          >
            Share your favorite Recipe
          </Link>
        </p>
      </header>
      <section className="main" aria-label="Recipes">
        <MealsExplorer meals={meals} />
      </section>
    </>
  );
};
export default MealsPage;
