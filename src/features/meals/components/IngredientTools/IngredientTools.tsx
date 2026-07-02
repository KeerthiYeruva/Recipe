"use client";

import { useState } from "react";

interface IngredientToolsProps {
  ingredients: string[];
}

export function IngredientTools({ ingredients }: IngredientToolsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyIngredients = async () => {
    await navigator.clipboard.writeText(ingredients.join("\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <div className="ingredients-actions">
        <button
          type="button"
          className="copy-ingredients-button"
          onClick={handleCopyIngredients}
        >
          {copied ? "Copied" : "Copy Ingredients"}
        </button>
      </div>
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => {
          const inputId = `ingredient-${ingredient
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}-${index}`;

          return (
            <li key={ingredient}>
              <input type="checkbox" id={inputId} />
              <label htmlFor={inputId}>{ingredient}</label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
