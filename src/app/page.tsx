import Link from "next/link";

import "./page.scss";
import { ImageSlideshow } from "@/shared/components/media/ImageSlideshow/ImageSlideshow";
import { getMeals } from "@/features/meals/repositories/meal.repository";

const categoryDescriptions: Record<string, string> = {
  Breakfast: "Easy morning options to start your day.",
  Lunch: "Quick midday recipes that satisfy.",
  Dinner: "Fast dinners that taste great.",
  Dessert: "Simple sweet finishes worth making.",
  Snacks: "Easy snacks and shareable bites.",
  Drinks: "Quick and refreshing drink ideas.",
};

const Home = async () => {
  const meals = await getMeals();
  const categories = Array.from(
    new Map(
      meals.map((meal) => [
        meal.category,
        {
          name: meal.category,
          count: meals.filter((item) => item.category === meal.category).length,
          meal: meal.title,
        },
      ])
    ).values()
  );

  return (
    <div className="home-page">
      <header className="home-hero page-shell">
        <div className="home-hero__content">
          <h1>Quick and Delicious Recipes for Busy Days</h1>
          <p>Short on time, not on flavor! Explore our quick recipes now.</p>
          <p className="supporting-text">
            Healthy and delicious recipes ready in 10 minutes or less.
          </p>
          <div className="home-hero__actions">
            <Link href="/meals" className="button-primary">
              Explore Recipes
            </Link>
            <Link href="/meals" className="button-secondary">
              Browse Categories
            </Link>
          </div>
          <dl className="home-hero__stats">
            <div>
              <dt>Recipes</dt>
              <dd>{meals.length}</dd>
            </div>
            <div>
              <dt>Quickest prep</dt>
              <dd>{Math.min(...meals.map((meal) => meal.prep_time))} min</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{categories.length}</dd>
            </div>
          </dl>
        </div>
        <div className="home-hero__media">
          <ImageSlideshow />
        </div>
      </header>

      <section
        className="home-section page-section"
        aria-labelledby="browse-categories-title"
      >
        <div className="home-section__heading">
          <h2 id="browse-categories-title" className="section-title">
            Browse by Category
          </h2>
          <p className="section-copy">
            Find quick recipes for breakfast, lunch, dinner, snacks, desserts, and drinks.
          </p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/meals?category=${encodeURIComponent(category.name)}`}
              className="category-card"
            >
              <span className="category-card__count">{category.count} recipes</span>
              <h3>{category.name}</h3>
              <p>
                {categoryDescriptions[category.name] ??
                  "Fresh ideas from the recipe box."}
              </p>
              <span className="category-card__anchor">Try {category.meal}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-cta page-shell" aria-labelledby="share-cta-title">
        <div className="home-cta__panel">
          <h2 id="share-cta-title" className="section-title">
            Share a Quick Recipe
          </h2>
          <p className="section-copy">
            Have a healthy and delicious recipe that takes 10 minutes or less? Share it
            with the community.
          </p>
          <div className="home-cta__actions">
            <Link href="/meals/share" className="button-primary">
              Share recipe
            </Link>
            <Link href="/community" className="button-secondary">
              Visit community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
