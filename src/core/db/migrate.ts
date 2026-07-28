/**
 * Database Migration Runner
 * Creates the meals table schema in Postgres
 * 
 * Usage: npx tsx src/core/db/migrate.ts
 */

import "dotenv/config";
import { execute } from "./postgres";
import { createMealsTableSQL } from "./migrations";

async function runMigrations() {
  console.log("🔄 Running database migrations...");
  
  try {
    // Create meals table and indexes
    await execute(createMealsTableSQL);
    console.log("✓ Meals table created successfully");
  } catch (error: any) {
    // If table already exists, that's fine (42P07 is "already exists")
    if (error.code === "42P07") {
      console.log("✓ Meals table already exists");
    } else {
      console.error("❌ Migration failed:", error.message);
      process.exit(1);
    }
  }
}

runMigrations();
