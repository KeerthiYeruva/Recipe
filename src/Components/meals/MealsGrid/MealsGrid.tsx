import React from "react";
import MealItem from "../MealItem";
import "./meals-grid.scss";

// Define the props for MealsGrid
interface MealsGridProps {
  meals: Meal[];
}

const MealsGrid: React.FC<MealsGridProps> = ({ meals }) => {
  return (
    <ul className="meals-g">
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
