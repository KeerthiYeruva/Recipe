import MealsGrid from "@/Components/meals/MealsGrid";
import "./meals.scss";
import Link from "next/link";

import { getMeals } from "@/lib/meals";

const MealsPage = async () => {
  const meals = await getMeals();
  return (
    <>
      <header className="header-m">
        <h1>
          Short on time, not on flavor!{" "}
          <span className="highlight-m"> Explore our quick recipes now </span>{" "}
          🕒
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It&apos;s easy &
          fun!
        </p>
        <p className="cta">
          <Link href="/meals/share">Share your favorite Recipe</Link>
        </p>
      </header>
      <main className="main">
        <MealsGrid meals={meals} />
      </main>
    </>
  );
};
export default MealsPage;
