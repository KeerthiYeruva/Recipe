"use client";

import { useSyncExternalStore } from "react";

import {
  FAVORITE_MEALS_CHANGED_EVENT,
  FAVORITE_MEALS_STORAGE_KEY,
  getFavoriteMealSlugs,
} from "../utils/favorites";

const emptyFavoriteSlugs: string[] = [];
let cachedStorageValue: string | null = null;
let cachedFavoriteSlugs = emptyFavoriteSlugs;

function getFavoriteMealSlugsSnapshot(): string[] {
  if (typeof window === "undefined") {
    return emptyFavoriteSlugs;
  }

  const storageValue = window.localStorage.getItem(FAVORITE_MEALS_STORAGE_KEY);

  if (storageValue === cachedStorageValue) {
    return cachedFavoriteSlugs;
  }

  cachedStorageValue = storageValue;
  cachedFavoriteSlugs = getFavoriteMealSlugs();

  return cachedFavoriteSlugs;
}

function subscribeToFavoriteMealSlugs(onStoreChange: () => void): () => void {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === FAVORITE_MEALS_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(FAVORITE_MEALS_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener(FAVORITE_MEALS_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorageChange);
  };
}

export function useFavoriteMealSlugs(): string[] {
  return useSyncExternalStore(
    subscribeToFavoriteMealSlugs,
    getFavoriteMealSlugsSnapshot,
    () => emptyFavoriteSlugs
  );
}