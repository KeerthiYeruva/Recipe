"use client";

import Link from "next/link";

export default function MealDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="status-shell">
      <span className="eyebrow">Recipe unavailable</span>
      <h1>We couldn&apos;t load this recipe just now.</h1>
      <p>{error.message}</p>
      <div className="status-actions">
        <button onClick={reset} className="button-primary" type="button">
          Try Again
        </button>
        <Link href="/meals" className="button-secondary">
          Back to Recipes
        </Link>
      </div>
    </div>
  );
}
