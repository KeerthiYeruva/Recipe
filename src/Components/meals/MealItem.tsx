import Link from "next/link";
import Image from "next/image";

import "./meal-item.scss";
import React from "react";

interface MealItemProps {
  title: string;
  slug: any;
  image: any;
  summary: string;
  creator: string;
}

const MealItem: React.FC<MealItemProps> = ({
  title,
  slug,
  image,
  summary,
  creator,
}) => {
  return (
    <article className={"meal-m"}>
      <header>
        <div className={"image"}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={"headerText-m"}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={"content-m"}>
        <p className={"summary"}>{summary}</p>
        <div className={"actions-m"}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};
export default MealItem;
