"use client";

import { useDeferredValue, useState } from "react";

import type { Meal } from "../../types/meal.types";
import { MealsGrid } from "../MealsGrid/MealsGrid";
import "./meals-explorer.scss";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Drinks"];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Recipe Name A-Z", value: "title-asc" },
  { label: "Recipe Name Z-A", value: "title-desc" },
];

interface MealsExplorerProps {
  meals: Meal[];
}

export function MealsExplorer({ meals }: MealsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());

  const filteredMeals = meals
    .filter((meal) => {
      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;

      if (!deferredSearchTerm) {
        return matchesCategory;
      }

      const searchableText = [
        meal.title,
        meal.creator,
        meal.category,
        ...parseIngredients(meal.ingredients),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(deferredSearchTerm);
    })
    .sort((firstMeal, secondMeal) => {
      if (sortBy === "oldest") {
        return firstMeal.id - secondMeal.id;
      }

      if (sortBy === "title-asc") {
        return firstMeal.title.localeCompare(secondMeal.title);
      }

      if (sortBy === "title-desc") {
        return secondMeal.title.localeCompare(firstMeal.title);
      }

      return secondMeal.id - firstMeal.id;
    });

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
            {categories.map((category) => (
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
            onChange={(event) => setSortBy(event.target.value)}
          >
            {sortOptions.map((option) => (
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

function parseIngredients(ingredients: string): string[] {
  try {
    const parsedIngredients = JSON.parse(ingredients);
    return Array.isArray(parsedIngredients) ? parsedIngredients : [];
  } catch {
    return [];
  }
}