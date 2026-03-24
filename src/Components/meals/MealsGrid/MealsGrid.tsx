import React from "react";
import MealItem from "../MealItem";
import "./meals-grid.scss";

// Define the props for MealsGrid
interface MealsGridProps {
  meals: Meal[];
}

const MealsGrid: React.FC<MealsGridProps> = ({ meals }) => {
  return (
    <section aria-label="Available recipes">
      <ul className="meals-g" role="list">
        {meals.map((meal) => (
          <li key={meal.id} role="listitem">
            <MealItem {...meal} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MealsGrid;
