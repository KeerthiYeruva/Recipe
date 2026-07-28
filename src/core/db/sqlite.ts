import sql from "better-sqlite3";
import path from "node:path";

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "meals.db");

let dbInstance: sql.Database | null = null;

try {
  dbInstance = sql(dbPath);
} catch (error) {
  console.warn(
    "Database initialization failed:",
    error instanceof Error ? error.message : "Unknown error"
  );
  dbInstance = null;
}

// Export a stub database if initialization failed
export const db = dbInstance || ({
  prepare: () => ({
    all: () => [],
    get: () => undefined,
    run: () => ({ changes: 0 }),
  }),
} as unknown as sql.Database);

// Run migrations and seed data only if database is available
if (dbInstance) {
  try {
    const mealsTable = dbInstance
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'meals'")
      .get();

    if (mealsTable) {
      const existingColumns = dbInstance.prepare("PRAGMA table_info(meals)").all() as Array<{
        name: string;
      }>;
      const existingColumnNames = new Set(existingColumns.map((column) => column.name));

      const mealColumnMigrations = [
        "ALTER TABLE meals ADD COLUMN category TEXT NOT NULL DEFAULT 'Snacks'",
        "ALTER TABLE meals ADD COLUMN prep_time INTEGER NOT NULL DEFAULT 10",
        "ALTER TABLE meals ADD COLUMN servings INTEGER NOT NULL DEFAULT 2",
        "ALTER TABLE meals ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'Easy'",
        "ALTER TABLE meals ADD COLUMN calories INTEGER NOT NULL DEFAULT 250",
      ];

      for (const migration of mealColumnMigrations) {
        const columnName = migration.match(/ADD COLUMN (\w+)/)?.[1];

        if (columnName && !existingColumnNames.has(columnName)) {
          dbInstance.prepare(migration).run();
        }
      }

      const seedMetadata = [
        {
          slug: "cheesy-corn-bites",
          category: "Snacks",
          prep_time: 10,
          servings: 4,
          difficulty: "Easy",
          calories: 220,
        },
        {
          slug: "oats-apple-waffles",
          category: "Breakfast",
          prep_time: 15,
          servings: 2,
          difficulty: "Medium",
          calories: 340,
        },
        {
          slug: "ragi-chocolate-mug-cake",
          category: "Dessert",
          prep_time: 5,
          servings: 1,
          difficulty: "Easy",
          calories: 280,
        },
        {
          slug: "5-minute-overnight-oats",
          category: "Breakfast",
          prep_time: 5,
          servings: 1,
          difficulty: "Easy",
          calories: 310,
        },
        {
          slug: "healthiest-chocolate-ice-cream",
          category: "Dessert",
          prep_time: 8,
          servings: 2,
          difficulty: "Easy",
          calories: 260,
        },
        {
          slug: "zero-cream-mango-mousse",
          category: "Dessert",
          prep_time: 10,
          servings: 3,
          difficulty: "Easy",
          calories: 240,
        },
        {
          slug: "fresh-tomato-salad",
          category: "Lunch",
          prep_time: 7,
          servings: 2,
          difficulty: "Easy",
          calories: 150,
        },
      ];

      const updateSeedMetadata = dbInstance.prepare(`
        UPDATE meals
        SET category = @category,
            prep_time = @prep_time,
            servings = @servings,
            difficulty = @difficulty,
            calories = @calories
        WHERE slug = @slug
      `);

      for (const meal of seedMetadata) {
        updateSeedMetadata.run(meal);
      }
    }
  } catch (error) {
    console.warn(
      "Database migrations/seeding failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
}
