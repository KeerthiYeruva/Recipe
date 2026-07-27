"use client";

import Link from "next/link";

export default function MealsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="status-shell">
      <span className="eyebrow">Recipes unavailable</span>
      <h1>We couldn&apos;t load the recipe collection.</h1>
      <p>{error.message}</p>
      <div className="status-actions">
        <button onClick={reset} className="button-primary" type="button">
          Try Again
        </button>
        <Link href="/" className="button-secondary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
