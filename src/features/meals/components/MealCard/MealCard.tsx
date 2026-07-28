import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Meal } from "../../types/meal.types";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import styles from "./meal-card.module.scss";

interface MealCardProps extends Meal {
  priority?: boolean;
}

export function MealCard({
  title,
  slug,
  image,
  category,
  prep_time,
  servings,
  difficulty,
  calories,
  priority = false,
}: MealCardProps) {
  const badge = prep_time <= 10 ? "Quick" : difficulty === "Easy" ? "Easy" : "New";

  return (
    <article className={styles.mealCard}>
      <Link
        href={`/meals/${slug}`}
        className={styles.cardLink}
        aria-label={`View details for ${title} recipe`}
      >
        <div className={styles.image}>
          <Image
            src={image}
            alt={`${title} - a quick recipe`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
          />
          <div className={styles.imageOverlay} />
          <span className={styles.badge}>{badge}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <p className={styles.categoryPill}>{category}</p>
          </div>
          <h2 className={styles.title}>{title}</h2>
          <dl className={styles.mealStats}>
            <div>
              <dt>Prep</dt>
              <dd>{prep_time} min</dd>
            </div>
            <div>
              <dt>Serves</dt>
              <dd>{servings}</dd>
            </div>
            <div>
              <dt>Level</dt>
              <dd>{difficulty}</dd>
            </div>
            <div>
              <dt>Energy</dt>
              <dd>{calories} kcal</dd>
            </div>
          </dl>
          <span className={styles.cardCta}>Open recipe</span>
        </div>
      </Link>
      <div className={styles.cardTools}>
        <div className={styles.favoriteWrapper}>
          <FavoriteButton slug={slug} title={title} />
        </div>
      </div>
    </article>
  );
}
