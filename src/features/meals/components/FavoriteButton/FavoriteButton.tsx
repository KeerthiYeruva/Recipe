"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/shared/components/ui/ToastProvider/ToastProvider";
import {
  FAVORITE_MEALS_STORAGE_KEY,
  getFavoriteMealSlugs,
  toggleFavoriteMealSlug,
} from "../../utils/favorites";
import "./favorite-button.scss";

interface FavoriteButtonProps {
  slug: string;
  title: string;
}

export function FavoriteButton({ slug, title }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsFavorite(getFavoriteMealSlugs().includes(slug));
  }, [slug]);

  const handleToggleFavorite = () => {
    const nextFavoriteSlugs = toggleFavoriteMealSlug(slug);
    const nextIsFavorite = nextFavoriteSlugs.includes(slug);

    setIsFavorite(nextIsFavorite);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: FAVORITE_MEALS_STORAGE_KEY,
        newValue: JSON.stringify(nextFavoriteSlugs),
      })
    );
    showToast(
      nextIsFavorite ? `${title} saved to favorites` : `${title} removed from favorites`,
      "success"
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
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
      <span>{isFavorite ? "Saved" : "Save"}</span>
    </button>
  );
}
