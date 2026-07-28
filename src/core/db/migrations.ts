/**
 * SQL Migration Scripts for Vercel Postgres
 * 
 * Run these in order to set up the database schema.
 * You can run them via the Vercel dashboard or with the Postgres CLI.
 */

export const migrations = [
  // 001_create_meals_table.sql
  `
    CREATE TABLE IF NOT EXISTS meals (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      image VARCHAR(2048) NOT NULL,
      summary TEXT NOT NULL,
      instructions TEXT NOT NULL,
      ingredients JSONB DEFAULT '[]',
      category VARCHAR(100) NOT NULL,
      prep_time INTEGER NOT NULL,
      servings INTEGER NOT NULL,
      difficulty VARCHAR(50) NOT NULL,
      calories INTEGER NOT NULL,
      creator VARCHAR(255) NOT NULL,
      creator_email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_meals_slug ON meals(slug);
    CREATE INDEX IF NOT EXISTS idx_meals_category ON meals(category);
    CREATE INDEX IF NOT EXISTS idx_meals_creator ON meals(creator);
  `,
];

/**
 * SQL to create the meals table (simplified, no need to run other migrations)
 * Run this once in your Vercel Postgres dashboard or via CLI:
 * 
 * psql $POSTGRES_URL -c "CREATE TABLE IF NOT EXISTS meals (...)"
 */
export const createMealsTableSQL = `
  CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(2048) NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    ingredients JSONB DEFAULT '[]',
    category VARCHAR(100) NOT NULL,
    prep_time INTEGER NOT NULL,
    servings INTEGER NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    calories INTEGER NOT NULL,
    creator VARCHAR(255) NOT NULL,
    creator_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_meals_slug ON meals(slug);
  CREATE INDEX IF NOT EXISTS idx_meals_category ON meals(category);
  CREATE INDEX IF NOT EXISTS idx_meals_creator ON meals(creator);
`;
