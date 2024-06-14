import { getMeal } from "@/lib/meals";
import "./meals-detail.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import { title } from "process";

interface MealsDetailPageProps {
  params: {
    mealsSlug: string;
  };
}

export const generateMetaData = async ({ params }: MealsDetailPageProps) => {
  const meal = getMeal(params.mealsSlug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal?.title,
    description: meal?.summary,
  };
};
const MealsDetailPage = ({ params }: MealsDetailPageProps) => {
  const meal = getMeal(params.mealsSlug);

  if (!meal) {
    notFound();
    return null; // Ensure the function exits if notFound is called
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className="header-md">
        <div className="image-md">
          {meal.image && typeof meal.image === "string" ? (
            <Image src={meal.image} fill alt={meal.title} />
          ) : (
            <p>No image available</p>
          )}
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
