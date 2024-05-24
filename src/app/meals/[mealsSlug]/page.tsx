import { getMeal } from "@/lib/meals";
import "./meals-detail.scss";
import Image from "next/image";
import { notFound } from "next/navigation";

const MealsDetailPage = ({ params }) => {
  const meal = getMeal(params.mealsSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className="header-md">
        <div className="image-md">
          <Image src={meal.image} fill alt={meal.title} />
        </div>
        <div className="headerText">
          <h1>{meal.title}</h1>
          <p className="creator-md">by {meal.creator}</p>
          <p className="summary">{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className="instructions-md"
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
};

export default MealsDetailPage;
