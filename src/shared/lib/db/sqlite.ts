import sql from "better-sqlite3";
import path from "node:path";

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "meals.db");

export const db = sql(dbPath);
