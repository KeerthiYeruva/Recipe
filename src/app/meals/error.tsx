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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ color: "var(--accent-primary)" }}>Failed to load recipes</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        {error.message}
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "0.5rem 1.5rem",
            backgroundColor: "var(--accent-primary)",
            color: "var(--text-light)",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: "0.5rem 1.5rem",
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
