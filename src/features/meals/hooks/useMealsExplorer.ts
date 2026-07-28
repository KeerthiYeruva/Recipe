"use client";

import { useDeferredValue, useState } from "react";

import type { Meal } from "../types/meal.types";
import type { MealQuickFilter, MealSortOption } from "../constants/meal.constants";
import { filterByQuickFilter, filterMeals } from "../utils/meal-filters";
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
  const [quickFilter, setQuickFilter] = useState<MealQuickFilter>("all");
  const [sortBy, setSortBy] = useState<MealSortOption>(initialSort);

  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());

  const filteredMeals = sortMeals(
    filterByQuickFilter(
      filterMeals(
        meals,
        selectedCategory !== "All" ? selectedCategory : null,
        deferredSearchTerm
      ),
      quickFilter
    ),
    sortBy
  );

  const hasActiveFilters =
    searchTerm.trim().length > 0 || selectedCategory !== "All" || quickFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setQuickFilter("all");
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
    quickFilter,
    setQuickFilter,
    sortBy,
    setSortBy,
  };
}
