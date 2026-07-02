import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Meal } from "../../types/meal.types";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import "./meal-item.scss";

export function MealItem({
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
    <article className="meal-m">
      <header>
        <div className="image">
          <Image src={image} alt={`${title} - a quick recipe`} fill />
        </div>
        <div className="headerText-m">
          <p className="category-pill">{category}</p>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className="content-m">
        <div className="card-tools">
          <FavoriteButton slug={slug} title={title} />
        </div>
        <p className="summary">{summary}</p>
        <dl className="meal-stats">
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
        <div className="actions-m">
          <Link
            href={`/meals/${slug}`}
            aria-label={`View details for ${title} recipe`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
