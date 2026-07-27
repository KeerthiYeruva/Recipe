import Link from "next/link";

import "./page.scss";
import { ImageSlideshow } from "@/shared/components/media/ImageSlideshow/ImageSlideshow";
import { getMeals } from "@/features/meals/repositories/meal.repository";

const categoryDescriptions: Record<string, string> = {
  Breakfast: "Bright starts, make-ahead bowls, and easy first bites.",
  Lunch: "Fast midday plates with crisp textures and clean flavor.",
  Dinner: "Comforting meals that still fit a weeknight window.",
  Dessert: "Small sweet finishes that feel worth making.",
  Snacks: "Sharable bites for cravings, guests, or rainy afternoons.",
  Drinks: "Cooling pours and quick blends for a lighter reset.",
};

const Home = async () => {
  const meals = await getMeals();
  const popularMeals = [...meals].sort(
    (firstMeal, secondMeal) => secondMeal.id - firstMeal.id
  );
  const quickMeals = [...meals]
    .filter((meal) => meal.prep_time <= 10)
    .sort((firstMeal, secondMeal) => firstMeal.prep_time - secondMeal.prep_time);
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
          <span className="eyebrow">Weeknight cooking, elevated</span>
          <h1>Recipes that feel thoughtful, even when dinner needs to move fast.</h1>
          <p>
            Savory Table helps you find polished, approachable recipes with quick prep,
            warm flavors, and enough flexibility for real schedules.
          </p>
          <div className="home-hero__actions">
            <Link href="/meals" className="button-primary">
              Search recipes
            </Link>
            <Link href="/meals/share" className="button-secondary">
              Share your recipe
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
          <span className="eyebrow">Browse by category</span>
          <h2 id="browse-categories-title" className="section-title">
            Pick a mood, then let dinner take shape.
          </h2>
          <p className="section-copy">
            The collection already spans easy breakfasts, snackable bites, and lighter
            desserts, so browsing is as useful as searching.
          </p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.name} className="category-card">
              <span className="category-card__count">{category.count} recipes</span>
              <h3>{category.name}</h3>
              <p>
                {categoryDescriptions[category.name] ??
                  "Fresh ideas from the recipe box."}
              </p>
              <span className="category-card__anchor">Try {category.meal}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-section page-section"
        aria-labelledby="popular-recipes-title"
      >
        <div className="home-section__split">
          <div>
            <span className="eyebrow">Cooking inspiration</span>
            <h2 id="popular-recipes-title" className="section-title">
              Start with the recipes people would reach for first.
            </h2>
          </div>
          <p className="section-copy">
            A curated mix of the newest additions, crowd-pleasing categories, and dishes
            with a strong balance of convenience and comfort.
          </p>
        </div>
        <div className="feature-grid">
          {popularMeals.slice(0, 3).map((meal) => (
            <Link key={meal.slug} href={`/meals/${meal.slug}`} className="feature-card">
              <span className="feature-card__meta">{meal.category}</span>
              <h3>{meal.title}</h3>
              <p>{meal.summary}</p>
              <dl>
                <div>
                  <dt>Prep</dt>
                  <dd>{meal.prep_time} min</dd>
                </div>
                <div>
                  <dt>Level</dt>
                  <dd>{meal.difficulty}</dd>
                </div>
                <div>
                  <dt>By</dt>
                  <dd>{meal.creator}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section page-section" aria-labelledby="quick-meals-title">
        <div className="home-section__split">
          <div>
            <span className="eyebrow">Quick meals</span>
            <h2 id="quick-meals-title" className="section-title">
              Fast enough for a workday, good enough for a repeat request.
            </h2>
          </div>
          <Link href="/meals" className="button-ghost">
            View all recipes
          </Link>
        </div>
        <div className="quick-list" role="list">
          {quickMeals.slice(0, 4).map((meal) => (
            <Link
              key={meal.slug}
              href={`/meals/${meal.slug}`}
              className="quick-list__item"
            >
              <div>
                <span>{meal.category}</span>
                <h3>{meal.title}</h3>
              </div>
              <dl>
                <div>
                  <dt>Prep</dt>
                  <dd>{meal.prep_time} min</dd>
                </div>
                <div>
                  <dt>Calories</dt>
                  <dd>{meal.calories} kcal</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-cta page-shell" aria-labelledby="share-cta-title">
        <div className="home-cta__panel">
          <span className="eyebrow">Share your recipe</span>
          <h2 id="share-cta-title" className="section-title">
            Have a go-to recipe that saves your week? Add it to the table.
          </h2>
          <p className="section-copy">
            Keep the existing recipe flow, but make the collection feel like a living food
            product shaped by what people actually cook.
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
