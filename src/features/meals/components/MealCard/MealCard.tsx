import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Meal } from "../../types/meal.types";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import styles from "./meal-card.module.scss";

export function MealCard({
  title,
  slug,
  image,
  summary,
  creator,
  category,
  prep_time,
  servings,
  difficulty,
}: Meal) {
  return (
    <article className={styles.mealCard}>
      <header>
        <div className={styles.image}>
          <Image src={image} alt={`${title} - a quick recipe`} fill />
        </div>
        <div className={styles.headerText}>
          <p className={styles.categoryPill}>{category}</p>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.cardTools}>
          <FavoriteButton slug={slug} title={title} />
        </div>
        <p className={styles.summary}>{summary}</p>
        <dl className={styles.mealStats}>
          <div>
            <dt>Prep</dt>
            <dd>{prep_time} mins</dd>
          </div>
          <div>
            <dt>Serves</dt>
            <dd>{servings}</dd>
          </div>
          <div>
            <dt>Level</dt>
            <dd>{difficulty}</dd>
          </div>
        </dl>
        <div className={styles.actions}>
          <Link href={`/meals/${slug}`} aria-label={`View details for ${title} recipe`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
