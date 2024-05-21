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
    title: "Classic Mac n Cheese",
    slug: "classic-mac-n-cheese",
    image: "/images/macncheese.jpg",
    summary:
      "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
    instructions: `
      1. Cook the macaroni:
         Boil macaroni according to package instructions until al dente.

      2. Prepare cheese sauce:
         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

      3. Combine:
         Mix the cheese sauce with the drained macaroni.

      4. Bake:
         Transfer to a baking dish, top with breadcrumbs, and bake until golden.

      5. Serve:
         Serve hot, garnished with parsley if desired.
    `,
    creator: "Laura Smith",
    creator_email: "laurasmith@example.com",
  },
  {
    title: "Authentic Pizza",
    slug: "authentic-pizza",
    image: "/images/pizza.jpg",
    summary:
      "Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.",
    instructions: `
      1. Prepare the dough:
         Knead pizza dough and let it rise until doubled in size.

      2. Shape and add toppings:
         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

      3. Bake the pizza:
         Bake in a preheated oven at 220°C for about 15-20 minutes.

      4. Serve:
         Slice hot and enjoy with a sprinkle of basil leaves.
    `,
    creator: "Mario Rossi",
    creator_email: "mariorossi@example.com",
  },
  {
    title: "Wiener Schnitzel",
    slug: "wiener-schnitzel",
    image: "/images/schnitzel.jpg",
    summary:
      "Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.",
    instructions: `
      1. Prepare the veal:
         Pound veal cutlets to an even thickness.

      2. Bread the veal:
         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

      3. Fry the schnitzel:
      Heat oil in a pan and fry each schnitzel until golden brown on both sides.

      4. Serve:
      Serve hot with a slice of lemon and a side of potato salad or greens.
 `,
    creator: "Franz Huber",
    creator_email: "franzhuber@example.com",
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
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
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
    stmt.run(meal);
  }
}

initData();
