export const FAVORITE_MEALS_STORAGE_KEY = "recipe-app.favorite-meals";

export function getFavoriteMealSlugs(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedFavoriteSlugs = window.localStorage.getItem(
      FAVORITE_MEALS_STORAGE_KEY
    );
    const parsedFavoriteSlugs = storedFavoriteSlugs
      ? JSON.parse(storedFavoriteSlugs)
      : [];

    return Array.isArray(parsedFavoriteSlugs)
      ? parsedFavoriteSlugs.filter((slug): slug is string => typeof slug === "string")
      : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteMealSlug(slug: string): string[] {
  const favoriteSlugs = getFavoriteMealSlugs();
  const nextFavoriteSlugs = favoriteSlugs.includes(slug)
    ? favoriteSlugs.filter((favoriteSlug) => favoriteSlug !== slug)
    : [...favoriteSlugs, slug];

  window.localStorage.setItem(
    FAVORITE_MEALS_STORAGE_KEY,
    JSON.stringify(nextFavoriteSlugs)
  );

  return nextFavoriteSlugs;
}
