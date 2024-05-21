import MealItem from "./MealItem";
import "./meals-grid.scss";
const MealsGrid = ({ meals }) => {
  return (
    <>
      <ul className="meals-g">
        {meals.map((meal) => (
          <li key={meal.id}>
            <MealItem {...meal} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default MealsGrid;
