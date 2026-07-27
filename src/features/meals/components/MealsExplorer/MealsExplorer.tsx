"use client";

import type { Meal } from "../../types/meal.types";
import {
  MEAL_CATEGORIES,
  MEAL_SORT_OPTIONS,
  type MealSortOption,
} from "../../constants/meal.constants";
import { MealsGrid } from "../MealsGrid/MealsGrid";
import { useMealsExplorer } from "../../hooks/useMealsExplorer";
import "./meals-explorer.scss";

interface MealsExplorerProps {
  meals: Meal[];
}

export function MealsExplorer({ meals }: MealsExplorerProps) {
  const {
    filteredMeals,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  } = useMealsExplorer({ meals });

  return (
    <section className="meals-explorer" aria-label="Find recipes">
      <div className="explorer-controls">
        <div className="control-field search-field">
          <label htmlFor="meal-search">Search recipes</label>
          <input
            id="meal-search"
            type="search"
            placeholder="Search by name, creator, or ingredient"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="control-field">
          <label htmlFor="meal-category">Category</label>
          <select
            id="meal-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="All">All</option>
            {MEAL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="control-field">
          <label htmlFor="meal-sort">Sort</label>
          <select
            id="meal-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as MealSortOption)}
          >
            {MEAL_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        Showing {filteredMeals.length} of {meals.length} recipes
      </p>

      {filteredMeals.length > 0 ? (
        <MealsGrid meals={filteredMeals} />
      ) : (
        <p className="empty-results">No recipes match your search yet.</p>
      )}
    </section>
  );
}
