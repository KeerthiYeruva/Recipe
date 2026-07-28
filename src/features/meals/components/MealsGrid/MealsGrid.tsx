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
        {meals.map((meal, index) => (
          <li key={meal.id} role="listitem">
            <MealCard {...meal} priority={index === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
