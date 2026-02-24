import { getMeal } from "@/lib/meals";
import "./meals-detail.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

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

  // Parse ingredients from JSON string stored in database
  let ingredients: string[] = [];
  try {
    if (meal.ingredients) {
      ingredients = JSON.parse(meal.ingredients);
    }
  } catch (error) {
    console.error("Error parsing ingredients:", error);
    ingredients = [];
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <div className="back-button-container">
        <Link href="/meals" className="back-button" aria-label="Back to all recipes">
          ← Back to Recipes
        </Link>
      </div>
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
      
      {ingredients.length > 0 && (
        <section aria-label="Recipe ingredients" className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>
      )}
      
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
