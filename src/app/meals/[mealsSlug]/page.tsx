import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMeal } from "@/lib/meals";
import "./meals-detail.scss";

interface MealsDetailPageProps {
  params: {
    mealsSlug: string;
  };
}

// Ensure that getMeal is async
export const generateMetadata = async ({
  params,
}: MealsDetailPageProps): Promise<Metadata> => {
  const meal = await getMeal(params.mealsSlug); // Ensure getMeal is awaited
  if (!meal) {
    notFound();
    return {
      title: "Meal not found",
      description: "The requested meal could not be found.",
    };
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealsDetailPage = async ({ params }: MealsDetailPageProps) => {
  const meal = await getMeal(params.mealsSlug); // Ensure getMeal is awaited

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
