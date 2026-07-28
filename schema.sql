-- PostgreSQL Schema for Recipe App
-- Run this in your Vercel Postgres database

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

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_meals_slug ON meals(slug);
CREATE INDEX IF NOT EXISTS idx_meals_category ON meals(category);
CREATE INDEX IF NOT EXISTS idx_meals_creator ON meals(creator);
CREATE INDEX IF NOT EXISTS idx_meals_created_at ON meals(created_at DESC);

-- Sample data (optional)
INSERT INTO meals (
  title, slug, image, summary, instructions, ingredients,
  category, prep_time, servings, difficulty, calories, creator, creator_email
) VALUES (
  'Cheesy Corn Bites',
  'cheesy-corn-bites',
  '/images/cheesy-corn-bites.jpg',
  'Delicious bites made with corn, cheese spread, and seasonings, perfect as a snack or appetizer.',
  '1. Cut the bread into disc shapes.
2. Spread pizza sauce and mayonnaise over each bread disc.
3. In a bowl, mix boiled corn, cheese spread, red chili flakes, pizza seasoning, and pizza sauce.
4. Top each bread disc with the cheese corn mixture.
5. Cook on one side until the cheese melts in butter.
6. Serve hot.',
  '["bread", "pizza sauce", "mayonnaise", "boiled corn", "cheese spread", "red chili flakes", "pizza seasoning", "butter"]',
  'Snacks',
  10,
  4,
  'Easy',
  220,
  'Monika Jain (Homechef)',
  'monika_jain@example.com'
) ON CONFLICT (slug) DO NOTHING;
