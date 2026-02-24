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

// Function to extract ingredient names (without quantities)
function extractIngredients(instructions: string): string[] {
  // Only extract from a dedicated "Ingredients:" section
  const ingredientsMatch = instructions.match(/ingredients?:\s*\n([\s\S]*?)(?:\n\d+\.|$)/i);
  
  if (!ingredientsMatch) return [];
  
  const ingredientsText = ingredientsMatch[1];
  const ingredients = ingredientsText
    .split('\n')
    .map(line => {
      // Remove leading bullets, dashes, numbers
      let item = line.replace(/^[\s\-•*\d.]+\s*/, '').trim();
      
      // Remove quantities (e.g., "1 cup", "half", "2 tbsp", "3 oz")
      item = item.replace(/^\d+(?:\.?\d+)?\s*(cup|tsp|tbsp|oz|g|kg|ml|piece|pinch|dash|can|bottle|jar)s?\s+of\s+/i, '');
      item = item.replace(/^\d+(?:\.?\d+)?\s*(cup|tsp|tbsp|oz|g|kg|ml|piece|pinch|dash|can|bottle|jar)s?\s+/i, '');
      item = item.replace(/^(half|one|two|three|four|five|a bunch of|a few)\s+/i, '');
      
      return item.trim();
    })
    .filter(item => item.length > 2 && !item.match(/^\d+\./) && !item.includes(':'));
  
  return ingredients;
}

const MealsDetailPage = async ({ params }: MealsDetailPageProps) => {
  const { mealsSlug } = await params;
  const meal = getMeal(mealsSlug);

  if (!meal) {
    notFound();
    return null; // Ensure the function exits if notFound is called
  }

  const ingredients = extractIngredients(meal.instructions);
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
