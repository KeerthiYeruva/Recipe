"use client";

import { useEffect, useState } from "react";

import {
  FAVORITE_MEALS_STORAGE_KEY,
  getFavoriteMealSlugs,
  toggleFavoriteMealSlug,
} from "../../utils/favorites";

interface FavoriteButtonProps {
  slug: string;
  title: string;
}

export function FavoriteButton({ slug, title }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(getFavoriteMealSlugs().includes(slug));
  }, [slug]);

  const handleToggleFavorite = () => {
    const nextFavoriteSlugs = toggleFavoriteMealSlug(slug);
    setIsFavorite(nextFavoriteSlugs.includes(slug));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: FAVORITE_MEALS_STORAGE_KEY,
        newValue: JSON.stringify(nextFavoriteSlugs),
      })
    );
  };

  return (
    <button
      type="button"
      className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
      onClick={handleToggleFavorite}
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? "Remove" : "Save"} ${title} ${
        isFavorite ? "from" : "to"
      } favorites`}
    >
      {isFavorite ? "Saved" : "Save"}
    </button>
  );
}
