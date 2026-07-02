import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Meal } from "../../types/meal.types";
import "./meal-item.scss";

export function MealItem({ title, slug, image, summary, creator }: Meal) {
  return (
    <article className="meal-m">
      <header>
        <div className="image">
          <Image src={image} alt={`${title} - a quick recipe`} fill />
        </div>
        <div className="headerText-m">
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className="content-m">
        <p className="summary">{summary}</p>
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
