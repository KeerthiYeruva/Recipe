import { FavoritesView } from "@/features/meals/components/FavoritesView/FavoritesView";
import { getMeals } from "@/features/meals/repositories/meal.repository";
import "./favorites.scss";

export default async function FavoritesPage() {
  const meals = await getMeals();

  return (
    <>
      <header className="header-favorites">
        <h1>Saved Recipes</h1>
        <p>Your favorite recipes are saved in this browser.</p>
      </header>
      <FavoritesView meals={meals} />
    </>
  );
}
