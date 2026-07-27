import type { Meal } from "../../types/meal.types";
import { MealCard } from "../MealCard/MealCard";
import "./meals-grid.scss";

interface MealsGridProps {
  meals: Meal[];
}

export function MealsGrid({ meals }: MealsGridProps) {
  return (
    <section aria-label="Available recipes">
      <ul className="meals-g" role="list">
        {meals.map((meal) => (
          <li key={meal.id} role="listitem">
            <MealCard {...meal} />
          </li>
        ))}
      </ul>
    </section>
  );
}
