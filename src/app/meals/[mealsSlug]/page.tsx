import { getMeal } from "@/lib/meals";
import "./meals-detail.scss";
import Image from "next/image";
import { notFound } from "next/navigation";

interface MealsDetailPageProps {
  params: Promise<{
    mealsSlug: string;
  }>;
}

const MealsDetailPage = async ({ params }: MealsDetailPageProps) => {
  const { mealsSlug } = await params;
  const meal = getMeal(mealsSlug);

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
            <Image 
              src={meal.image} 
              fill 
              alt={`${meal.title} - a delicious recipe`}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="headerText">
          <h1>{meal.title}</h1>
          <p className="creator-md">by <strong>{meal.creator}</strong></p>
          <p className="summary">{meal.summary}</p>
        </div>
      </header>
      <section aria-label="Recipe instructions">
        <h2 className="sr-only">Instructions</h2>
        <p
          className="instructions-md"
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </section>
    </>
  );
};

export default MealsDetailPage;
