import Link from "next/link";

import { getMeals } from "@/features/meals/repositories/meal.repository";
import "./community-page.scss";

const CommunityPage = async () => {
  const meals = await getMeals();
  const contributors = Array.from(
    meals.reduce((creatorMap, meal) => {
      const existingCreator = creatorMap.get(meal.creator);

      creatorMap.set(meal.creator, {
        name: meal.creator,
        recipes: (existingCreator?.recipes ?? 0) + 1,
        latestMeal: existingCreator?.latestMeal ?? meal.title,
      });

      return creatorMap;
    }, new Map<string, { name: string; recipes: number; latestMeal: string }>())
  )
    .map(([, contributor]) => contributor)
    .sort((firstContributor, secondContributor) => {
      if (secondContributor.recipes !== firstContributor.recipes) {
        return secondContributor.recipes - firstContributor.recipes;
      }

      return firstContributor.name.localeCompare(secondContributor.name);
    });

  const categoryActivity = Array.from(
    meals.reduce((categoryMap, meal) => {
      categoryMap.set(meal.category, (categoryMap.get(meal.category) ?? 0) + 1);
      return categoryMap;
    }, new Map<string, number>())
  ).sort((firstCategory, secondCategory) => secondCategory[1] - firstCategory[1]);

  const latestMeals = [...meals]
    .sort((firstMeal, secondMeal) => secondMeal.id - firstMeal.id)
    .slice(0, 3);

  return (
    <>
      <header className="header-c">
        <h1>
          Built by people who cook, test, and <span className="highlight-c">share</span>
        </h1>
        <p>
          Meet the contributors behind the quick recipes and find where the community is
          most active.
        </p>
      </header>

      <main className="main-c">
        <section className="community-panel" aria-labelledby="contributors-title">
          <div className="community-section-heading">
            <p className="eyebrow">Contributors</p>
            <h2 id="contributors-title">People Behind the Recipes</h2>
          </div>
          <ul className="contributors-list">
            {contributors.slice(0, 4).map((contributor) => (
              <li key={contributor.name}>
                <span className="contributor-avatar" aria-hidden="true">
                  {contributor.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <h3>{contributor.name}</h3>
                  <p>{contributor.latestMeal}</p>
                </div>
                <strong>
                  {contributor.recipes} {contributor.recipes === 1 ? "share" : "shares"}
                </strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="community-panel" aria-labelledby="activity-title">
          <div className="community-section-heading">
            <p className="eyebrow">Activity</p>
            <h2 id="activity-title">Where the Community Is Cooking</h2>
          </div>
          <div className="category-activity">
            {categoryActivity.map(([category, count]) => (
              <Link
                key={category}
                href={`/meals?category=${encodeURIComponent(category)}`}
              >
                <span>{category}</span>
                <strong>{count}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="community-panel" aria-labelledby="latest-title">
          <div className="community-section-heading">
            <p className="eyebrow">Latest</p>
            <h2 id="latest-title">Recently Shared</h2>
          </div>
          <ul className="latest-shares">
            {latestMeals.map((meal) => (
              <li key={meal.id}>
                <Link href={`/meals/${meal.slug}`}>
                  <span>{meal.category}</span>
                  <strong>{meal.title}</strong>
                  <small>by {meal.creator}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="community-cta" aria-labelledby="share-community-title">
          <div>
            <p className="eyebrow">Contribute</p>
            <h2 id="share-community-title">Add a Recipe Others Can Actually Cook</h2>
            <p>
              Clear ingredients, realistic prep time, and simple steps make your recipe
              useful to the next person.
            </p>
          </div>
          <Link href="/meals/share">Share Recipe</Link>
        </section>
      </main>
    </>
  );
};

export default CommunityPage;
