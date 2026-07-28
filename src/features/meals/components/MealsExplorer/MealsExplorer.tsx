"use client";

import { useState } from "react";

import { useToast } from "@/shared/components/ui/ToastProvider/ToastProvider";
import type { Meal } from "../../types/meal.types";
import {
  MEAL_CATEGORIES,
  MEAL_QUICK_FILTERS,
  MEAL_SORT_OPTIONS,
  type MealQuickFilter,
  type MealSortOption,
} from "../../constants/meal.constants";
import { MealsGrid } from "../MealsGrid/MealsGrid";
import { useMealsExplorer } from "../../hooks/useMealsExplorer";
import "./meals-explorer.scss";

interface MealsExplorerProps {
  meals: Meal[];
  initialCategory?: string;
}

export function MealsExplorer({ meals, initialCategory }: MealsExplorerProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { showToast } = useToast();
  const {
    filteredMeals,
    hasActiveFilters,
    clearFilters,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    quickFilter,
    setQuickFilter,
    sortBy,
    setSortBy,
  } = useMealsExplorer({ meals, initialCategory });

  const selectedQuickFilter = MEAL_QUICK_FILTERS.find(
    (filter) => filter.value === quickFilter
  );
  const activeFilters = [
    searchTerm.trim() ? { key: "search", label: `Search: ${searchTerm.trim()}` } : null,
    selectedCategory !== "All"
      ? { key: "category", label: `Category: ${selectedCategory}` }
      : null,
    selectedQuickFilter ? { key: "quick", label: selectedQuickFilter.label } : null,
  ].filter(
    (value): value is { key: "search" | "category" | "quick"; label: string } =>
      value !== null
  );

  const handleClearFilters = () => {
    clearFilters();
    showToast("Filters cleared", "success");
  };

  const removeFilter = (key: "search" | "category" | "quick") => {
    if (key === "search") {
      setSearchTerm("");
      return;
    }

    if (key === "quick") {
      setQuickFilter("all");
      return;
    }

    setSelectedCategory("All");
  };

  return (
    <section className="meals-explorer" aria-label="Find recipes">
      <div className="explorer-toolbar">
        <div>
          <p className="result-count" aria-live="polite">
            Showing <strong>{filteredMeals.length}</strong> of{" "}
            <strong>{meals.length}</strong> recipes
          </p>
          <p className="result-subcopy">
            Search, filter by category, or sort without leaving the page.
          </p>
        </div>
        <div className="explorer-toolbar__actions">
          <button
            type="button"
            className="filters-toggle"
            aria-expanded={isFiltersOpen}
            aria-controls="meals-filter-panel"
            onClick={() => setIsFiltersOpen((currentState) => !currentState)}
          >
            {isFiltersOpen ? "Hide filters" : "Show filters"}
          </button>
          {hasActiveFilters ? (
            <button type="button" className="clear-filters" onClick={handleClearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      <div className="quick-filters" aria-label="Quick recipe filters">
        {MEAL_QUICK_FILTERS.map((filter) => (
          <button
            type="button"
            key={filter.value}
            className={quickFilter === filter.value ? "is-active" : ""}
            aria-pressed={quickFilter === filter.value}
            onClick={() =>
              setQuickFilter((currentFilter: MealQuickFilter) =>
                currentFilter === filter.value ? "all" : filter.value
              )
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div
        id="meals-filter-panel"
        className={`explorer-controls${isFiltersOpen ? " is-open" : ""}`}
      >
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

      {activeFilters.length > 0 ? (
        <ul className="active-filters" aria-label="Active filters">
          {activeFilters.map((filter) => (
            <li key={filter.key}>
              <button type="button" onClick={() => removeFilter(filter.key)}>
                {filter.label}
                <span aria-hidden="true">x</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {filteredMeals.length > 0 ? (
        <MealsGrid meals={filteredMeals} />
      ) : (
        <div className="empty-results">
          <h2>No recipes matched this search</h2>
          <p>
            Try a broader term or remove a filter to bring more dishes back into view.
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              className="button-secondary"
              onClick={handleClearFilters}
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
