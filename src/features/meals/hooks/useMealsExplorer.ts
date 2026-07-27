"use client";

import { useDeferredValue, useState } from "react";

import type { Meal } from "../types/meal.types";
import type { MealSortOption } from "../constants/meal.constants";
import { filterMeals } from "../utils/meal-filters";
import { sortMeals } from "../utils/meal-sorters";

interface UseMealsExplorerProps {
  meals: Meal[];
  initialCategory?: string;
  initialSort?: MealSortOption;
}

export function useMealsExplorer({
  meals,
  initialCategory = "All",
  initialSort = "newest",
}: UseMealsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<MealSortOption>(initialSort);

  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());

  const filteredMeals = sortMeals(
    filterMeals(
      meals,
      selectedCategory !== "All" ? selectedCategory : null,
      deferredSearchTerm
    ),
    sortBy
  );

  const hasActiveFilters = searchTerm.trim().length > 0 || selectedCategory !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy(initialSort);
  };

  return {
    filteredMeals,
    hasActiveFilters,
    clearFilters,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  };
}
