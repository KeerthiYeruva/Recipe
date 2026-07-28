import { sql } from "@vercel/postgres";

/**
 * Vercel Postgres database adapter
 * 
 * Note: @vercel/postgres is automatically available on Vercel deployments.
 * For local development, ensure you have POSTGRES_URL set in your .env.local
 */

export async function query<T>(text: string, params?: (string | number | null)[]): Promise<T[]> {
  try {
    const result = await sql.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function queryOne<T>(text: string, params?: (string | number | null)[]): Promise<T | null> {
  try {
    const result = await sql.query(text, params);
    return (result.rows[0] as T) || null;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function execute(text: string, params?: (string | number | null)[]): Promise<{ rowCount: number }> {
  try {
    const result = await sql.query(text, params);
    return { rowCount: result.rowCount || 0 };
  } catch (error) {
    console.error("Database execution error:", error);
    throw error;
  }
}
