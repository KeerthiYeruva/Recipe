"use client";

import { useFormStatus } from "react-dom";

export function MealFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? "Sharing recipe..." : "Share recipe"}</button>
  );
}
