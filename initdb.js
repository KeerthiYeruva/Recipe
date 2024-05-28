const sql = require("better-sqlite3");
const db = sql("meals.db");

const dummyMeals = [
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
    creator: "Monika Jain (Homechef)",
    creator_email: "monika_jain@example.com",
  },
  {
    title: "Oats Apple Waffles",
    slug: "oats-apple-waffles", // Adjust this value to make it unique
    image: "/images/waffles.jpg",
    summary:
      "Healthy and nutritious waffles made with oats and apple, perfect for a wholesome breakfast.",
    instructions: `
          1. Prepare the ingredients:
             Mix half a cup of wheat flour, half a cup of ground oats, cinnamon or cardamom powder to taste, and jaggery powder to taste. Grate one small apple and add it to the mixture. Gradually add milk to make a smooth batter.
        
          2. Cook the waffles:
             Grease the waffle maker with oil or butter. Pour 2-3 scoops of batter into the waffle maker and close it. Cook until the waffles are golden brown.
        
          3. Serve:
             Dress the waffles with banana, apple, choco chips, berries, and a drizzle of maple syrup. Serve hot.
        `,
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
    creator: "Chef Healthy",
    creator_email: "chefhealthy@example.com",
  },
  {
    title: "5-Minute Overnight Oats",
    slug: "5-minute-overnight-oats",
    image: "/images/overnight-oats.jpg",
    summary:
      "Overnight oats with berries, banana, and almond butter. A healthy, easy breakfast you can make in 5 minutes and enjoy on the go!",
    instructions: `
      1. In the evening, mix oats, chia seeds, yogurt, and water in an airtight container (a jar with a lid works!) and leave it in the fridge.
      2. In the morning, top with banana, walnuts, berries of your choice, and almond or peanut butter. Enjoy immediately or on the go.`,
    creator: "Half-Human, Half-Mom",
    creator_email: "info@hh-hm.com",
  },
  {
    title: "Healthiest Chocolate Ice Cream 🍫🍫",
    slug: "healthiest-chocolate-ice-cream",
    image: "/images/chocolate-ice-cream.jpg",
    summary:
      "Delicious and guilt-free chocolate ice cream made with wholesome ingredients.",
    instructions: `
      1. Place Makhana, soaked almonds, dates, milk, and sugar-free dark chocolate into a food processor or high-speed blender.
      2. Pulse/process until smooth and creamy. You may need to turn off the motor and stir the mixture a couple of times while processing.
      3. Add in chocolate chips (if using). Spoon ice cream into a bowl and enjoy! If you want to be able to scoop the ice cream, you can place it in the freezer for 6-8 hours so it’s solid enough to scoop.`,
    creator: "Chef Healthy",
    creator_email: "chefhealthy@example.com",
  },
  {
    title: "Zero Cream Mango Mousse",
    slug: "zero-cream-mango-mousse",
    image: "/images/mango-mousse.jpg",
    summary:
      "A delightful and healthy mango mousse recipe made without cream, perfect for a guilt-free indulgence.",
    instructions: `
      1. Blend together 2 ripe mangoes (reserving a few pieces for garnish), 200 grams of fresh paneer, 1 tsp of vanilla extract, and ¼ cup of jaggery until smooth.
      2. Transfer the mixture to a bowl and let it set in the refrigerator for at least 3 hours.
      3. Garnish with pistachio and mango pieces before serving and enjoy!`,
    creator: "bowl2soul",
    creator_email: "bowl2soul@example.com",
  },

  {
    title: "Fresh Tomato Salad",
    slug: "fresh-tomato-salad",
    image: "/images/tomato-salad.jpg",
    summary:
      "A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.",
    instructions: `
      1. Prepare the tomatoes:
        Slice fresh tomatoes and arrange them on a plate.
    
      2. Add herbs and seasoning:
         Sprinkle chopped basil, salt, and pepper over the tomatoes.
    
      3. Dress the salad:
         Drizzle with olive oil and balsamic vinegar.
    
      4. Serve:
         Enjoy this simple, flavorful salad as a side dish or light meal.
    `,
    creator: "Sophia Green",
    creator_email: "sophiagreen@example.com",
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`
).run();

async function initData() {
  const count = db.prepare("SELECT COUNT(*) as count FROM meals").get().count;
  if (count === 0) {
    const stmt = db.prepare(`
      INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES (
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
    `);

    for (const meal of dummyMeals) {
      try {
        stmt.run(meal);
      } catch (error) {
        console.error("Error inserting meal:", meal, error);
      }
    }
    console.log("Dummy data inserted successfully.");
  } else {
    console.log("Meals table already populated.");
  }
}

initData().catch(console.error);
