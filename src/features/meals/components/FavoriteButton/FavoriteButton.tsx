"use client";

import { useToast } from "@/shared/components/ui/ToastProvider/ToastProvider";
import { useFavoriteMealSlugs } from "../../hooks/useFavoriteMealSlugs";
import { toggleFavoriteMealSlug } from "../../utils/favorites";
import "./favorite-button.scss";

interface FavoriteButtonProps {
  slug: string;
  title: string;
}

export function FavoriteButton({ slug, title }: FavoriteButtonProps) {
  const favoriteSlugs = useFavoriteMealSlugs();
  const { showToast } = useToast();
  const isFavorite = favoriteSlugs.includes(slug);

  const handleToggleFavorite = () => {
    const nextFavoriteSlugs = toggleFavoriteMealSlug(slug);
    const nextIsFavorite = nextFavoriteSlugs.includes(slug);

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
      <span>{isFavorite ? "Saved" : "Save"}</span>
    </button>
  );
}
