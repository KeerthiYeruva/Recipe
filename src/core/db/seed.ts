/**
 * Migration script to seed initial meals data to Postgres
 * 
 * Usage: npx tsx src/core/db/seed.ts
 * 
 * This script reads initial meal data and inserts it into the Postgres database.
 * Run this after creating the meals table.
 */

import "dotenv/config";
import { execute } from "./postgres";

const seedMeals = [
  {
    title: "Cheesy Corn Bites",
    slug: "cheesy-corn-bites",
    image: "/images/cheesy-corn-bites.jpg",
    summary:
      "Delicious bites made with corn, cheese spread, and seasonings, perfect as a snack or appetizer.",
    instructions: `
1. Cut the bread into disc shapes.
2. Spread pizza sauce and mayonnaise over each bread disc.
3. In a bowl, mix boiled corn, cheese spread, red chili flakes, pizza seasoning, and pizza sauce.
4. Top each bread disc with the cheese corn mixture.
5. Cook on one side until the cheese melts in butter.
6. Serve hot.`,
    ingredients: JSON.stringify([
      "bread",
      "pizza sauce",
      "mayonnaise",
      "boiled corn",
      "cheese spread",
      "red chili flakes",
      "pizza seasoning",
      "butter",
    ]),
    category: "Snacks",
    prep_time: 10,
    servings: 4,
    difficulty: "Easy",
    calories: 220,
    creator: "Monika Jain (Homechef)",
    creator_email: "monika_jain@example.com",
  },
  {
    title: "Oats Apple Waffles",
    slug: "oats-apple-waffles",
    image: "/images/waffles.jpg",
    summary:
      "Healthy and nutritious waffles made with oats and apple, perfect for a wholesome breakfast.",
    instructions: `
1. Prepare the ingredients:
   Mix half a cup of wheat flour, half a cup of ground oats, cinnamon or cardamom powder to taste, and jaggery powder to taste. Grate one small apple and add it to the mixture. Gradually add milk to make a smooth batter.

2. Cook the waffles:
   Grease the waffle maker with oil or butter. Pour 2-3 scoops of batter into the waffle maker and close it. Cook until the waffles are golden brown.

3. Serve:
   Dress the waffles with banana, apple, choco chips, berries, and a drizzle of maple syrup. Serve hot.`,
    ingredients: JSON.stringify([
      "wheat flour",
      "ground oats",
      "cinnamon",
      "cardamom powder",
      "jaggery powder",
      "apple",
      "milk",
      "oil",
      "butter",
      "banana",
      "chocolate chips",
      "berries",
      "maple syrup",
    ]),
    category: "Breakfast",
    prep_time: 15,
    servings: 2,
    difficulty: "Medium",
    calories: 340,
    creator: "Chef Healthy",
    creator_email: "chefhealthy@example.com",
  },
  {
    title: "Ragi Chocolate Mug Cake",
    slug: "ragi-chocolate-mug-cake",
    image: "/images/ragi-chocolate-mug-cake.jpg",
    summary:
      "A delicious and guilt-free gluten-free dessert option, made with ragi flour and jaggery.",
    instructions: `
1. In a microwave-safe mug, start by adding the dry ingredients: ragi flour, jaggery, cocoa powder, baking soda.
2. Now add the liquid ingredients: milk, oil, and vanilla extract.
3. Mix everything together and make sure to scrape the bottom.
4. Microwave the mug at regular heating mode for 2 minutes and dig right in.`,
    ingredients: JSON.stringify([
      "ragi flour",
      "jaggery",
      "cocoa powder",
      "baking soda",
      "milk",
      "oil",
      "vanilla extract",
    ]),
    category: "Dessert",
    prep_time: 5,
    servings: 1,
    difficulty: "Easy",
    calories: 280,
    creator: "Chef Healthy",
    creator_email: "chefhealthy@example.com",
  },
];

async function seed() {
  console.log("🌱 Seeding meals...");

  for (const meal of seedMeals) {
    try {
      await execute(
        `
        INSERT INTO meals (
          title, slug, image, summary, instructions, ingredients,
          category, prep_time, servings, difficulty, calories, creator, creator_email
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (slug) DO NOTHING
        `,
        [
          meal.title,
          meal.slug,
          meal.image,
          meal.summary,
          meal.instructions,
          meal.ingredients,
          meal.category,
          meal.prep_time,
          meal.servings,
          meal.difficulty,
          meal.calories,
          meal.creator,
          meal.creator_email,
        ]
      );
      console.log(`✓ Seeded: ${meal.title}`);
    } catch (error) {
      console.error(`✗ Failed to seed ${meal.title}:`, error);
    }
  }

  console.log("✓ Seeding complete");
}

seed().catch(console.error);
