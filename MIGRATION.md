# Migration Guide: SQLite to Vercel Postgres

This guide walks you through migrating the Recipe app from local SQLite to Vercel Postgres.

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Environment Variables](#environment-variables)
3. [Database Schema](#database-schema)
4. [Seeding Data](#seeding-data)
5. [Code Changes Summary](#code-changes-summary)
6. [Image Migration Strategy](#image-migration-strategy)
7. [Testing & Deployment](#testing--deployment)
8. [Troubleshooting](#troubleshooting)

---

## Installation & Setup

### Step 1: Install Vercel Postgres

```bash
npm install @vercel/postgres
```

### Step 2: Create Vercel Postgres Database

If you haven't already, create a Postgres database on Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Navigate to your project
3. Go to the **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Name your database (e.g., `recipe-app`)
6. The connection string will be automatically added to your environment

### Step 3: Link Project to Vercel

```bash
vercel link
```

---

## Environment Variables

Add these to your `.env.local` (for local development) and Vercel project settings:

### Local Development (`.env.local`)

```bash
POSTGRES_URL=postgresql://user:password@host:port/dbname
```

Get the `POSTGRES_URL` from your Vercel Postgres database.

### Vercel Deployment

The `POSTGRES_URL` is automatically provided when you create a Postgres database in Vercel Storage.

### Optional (for image storage)

If migrating images to Vercel Blob:

```bash
BLOB_READ_WRITE_TOKEN=your_blob_token
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

## Database Schema

### Create the Meals Table

Run this SQL in your Vercel Postgres database (via Vercel Dashboard → Data → Postgres → Query):

```sql
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
```

**Alternative: Run via psql CLI**

```bash
psql $POSTGRES_URL < schema.sql
```

---

## Seeding Data

### Option 1: Manual Insert (via Dashboard)

Use the Vercel Data Dashboard to run INSERT statements.

### Option 2: Use the Seed Script

1. Copy seed data to your Postgres database:

```bash
npx tsx src/core/db/seed.ts
```

**Note:** Make sure `POSTGRES_URL` is set in `.env.local` before running the script.

### Option 3: Import from SQLite

If you have existing meal data in SQLite:

```bash
# Export from SQLite
sqlite3 meals.db "SELECT * FROM meals" > meals.csv

# Import to Postgres (requires psql)
psql $POSTGRES_URL -c "\COPY meals FROM 'meals.csv' CSV HEADER"
```

---

## Code Changes Summary

### Files Changed

#### 1. **New: `src/core/db/postgres.ts`**
Replaces `src/core/db/sqlite.ts` with Vercel Postgres adapter.

```typescript
// Async database helpers
- query<T>(sql, params): Promise<T[]>
- queryOne<T>(sql, params): Promise<T | null>
- execute(sql, params): Promise<{ rowCount: number }>
```

#### 2. **New: `src/core/db/migrations.ts`**
Contains SQL schema and migration scripts.

#### 3. **New: `src/core/db/seed.ts`**
Seed script to populate initial meal data.

#### 4. **Updated: `src/features/meals/repositories/meal.repository.ts`**

**Changes:**
- Import from `postgres.ts` instead of `sqlite.ts`
- All functions are now **async**
- Uses parameterized queries (`$1`, `$2`, etc.) instead of `?`

**Before:**
```typescript
export function getMeals(): Meal[] {
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}
```

**After:**
```typescript
export async function getMeals(): Promise<Meal[]> {
  return await query<Meal>("SELECT * FROM meals ...");
}
```

#### 5. **Updated: `src/features/meals/services/meal.service.ts`**

**Changes:**
- `await createMeal()` call (now async)

```typescript
await createMeal({ ...meal, instructions: safeInstructions, image: imagePath });
```

#### 6. **Updated: `src/app/meals/[mealSlug]/page.tsx`**

**Changes:**
- `await getMealBySlug()` in `generateMetadata` and component

```typescript
const meal = await getMealBySlug(mealSlug);
```

#### 7. **Updated: `src/app/sitemap.ts`** (Already handles errors)

The sitemap already includes try-catch for database errors, so it gracefully handles Vercel environments.

---

## Image Migration Strategy

### Option 1: Keep Images in `public/images` (Simple)

**Pros:**
- Minimal changes
- Works locally and on Vercel during deployment

**Cons:**
- Vercel filesystem is ephemeral; images don't persist between deploys
- User-uploaded images will be lost

**Recommendation:** Use for demo/portfolio only.

### Option 2: Migrate to Vercel Blob (Recommended for Production)

**Pros:**
- Persistent storage
- CDN-backed
- Built into Vercel

**Steps:**

1. **Install Vercel Blob:**
   ```bash
   npm install @vercel/blob
   ```

2. **Create blob image service** (`src/core/blob/image.service.ts`):

   ```typescript
   import { put } from "@vercel/blob";

   export async function uploadMealImage(file: File, mealTitle: string): Promise<string> {
     const fileName = `${slugify(mealTitle, { lower: true })}-${Date.now()}`;
     const blob = await put(`meals/${fileName}`, file, { access: "public" });
     return blob.url;
   }
   ```

3. **Update `meal.service.ts`:**

   ```typescript
   import { uploadMealImage } from "@/core/blob/image.service";

   export async function saveMeal(meal: CreateMealInput): Promise<void> {
     const safeInstructions = xss(meal.instructions);
     const imageUrl = await uploadMealImage(meal.image, meal.title);

     await createMeal({
       ...meal,
       instructions: safeInstructions,
       image: imageUrl,
     });
   }
   ```

4. **Add environment variable:**
   ```
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   ```

### Option 3: Use Cloudinary or S3

Similar to Vercel Blob, but with external services (more control, additional costs).

---

## Testing & Deployment

### Local Testing

1. **Set up `.env.local`:**
   ```bash
   POSTGRES_URL=postgresql://...
   ```

2. **Create database schema:**
   ```bash
   psql $POSTGRES_URL < schema.sql
   ```

3. **Seed data:**
   ```bash
   npx tsx src/core/db/seed.ts
   ```

4. **Run dev server:**
   ```bash
   npm run dev
   ```

5. **Test:**
   - Visit `/meals` to see recipes
   - Visit `/meals/cheesy-corn-bites` for a detail page
   - Submit a new recipe via `/meals/share`

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: migrate from SQLite to Vercel Postgres"
   git push origin main
   ```

2. **Vercel auto-deploys** when you push to the connected branch.

3. **Verify deployment:**
   - Postgres database was created in Vercel Storage
   - `POSTGRES_URL` is set in project environment
   - Run seed script or manually insert data:
     ```bash
     vercel env pull
     npx tsx src/core/db/seed.ts
     ```

4. **Test live:**
   - Visit your deployed app
   - Check `/meals` page loads recipes
   - Test recipe detail pages
   - Test recipe submission

---

## Troubleshooting

### "Database connection failed"

**Issue:** `POSTGRES_URL` not set or invalid.

**Solution:**
1. Check `.env.local` has `POSTGRES_URL`
2. Verify it's the correct format: `postgresql://user:password@host:port/db`
3. Test connection:
   ```bash
   psql $POSTGRES_URL -c "SELECT 1"
   ```

### "relation "meals" does not exist"

**Issue:** Table not created.

**Solution:**
1. Run schema SQL again:
   ```bash
   psql $POSTGRES_URL < schema.sql
   ```
2. Verify table exists:
   ```bash
   psql $POSTGRES_URL -c "\dt"
   ```

### "TypeError: getMeals is not a function" (in Server Components)

**Issue:** Forgot to `await` async function.

**Solution:** Add `await`:
```typescript
// Before
const meals = getMeals();

// After
const meals = await getMeals();
```

### Images not persisting on Vercel

**Issue:** Using `public/images` (ephemeral).

**Solution:** Migrate to Vercel Blob (see Image Migration Strategy).

### Timeouts on slow queries

**Issue:** Large datasets or unoptimized queries.

**Solution:**
1. Add indexes:
   ```sql
   CREATE INDEX idx_meals_category ON meals(category);
   ```
2. Paginate results:
   ```typescript
   const meals = await query(
     "SELECT * FROM meals LIMIT 10 OFFSET $1",
     [page * 10]
   );
   ```

---

## Rollback Plan

If you need to revert to SQLite:

1. Keep the old `sqlite.ts` file
2. Revert `meal.repository.ts` to use SQLite imports
3. Remove `await` from async calls
4. This guide documents the reverse process

---

## Files Checklist

After migration, verify these files exist and are updated:

- ✅ `src/core/db/postgres.ts` (new)
- ✅ `src/core/db/migrations.ts` (new)
- ✅ `src/core/db/seed.ts` (new)
- ✅ `src/features/meals/repositories/meal.repository.ts` (updated)
- ✅ `src/features/meals/services/meal.service.ts` (updated)
- ✅ `src/app/meals/[mealSlug]/page.tsx` (updated)
- ✅ `src/app/sitemap.ts` (no changes needed)
- ✅ `.env.local` (added `POSTGRES_URL`)

---

## Performance Tips

1. **Use connection pooling** (Vercel Postgres does this automatically)
2. **Add indexes** on frequently queried columns (already done: slug, category, creator)
3. **Paginate** large result sets
4. **Cache** static routes with ISR (already implemented)
5. **Monitor** database usage in Vercel Dashboard → Storage → Metrics

---

## Next Steps

1. Follow the setup steps above
2. Test locally with `npm run dev`
3. Deploy to Vercel
4. Monitor database queries in Vercel Dashboard
5. Optimize indexes if needed

Questions? Check Vercel Postgres docs: https://vercel.com/docs/storage/vercel-postgres
