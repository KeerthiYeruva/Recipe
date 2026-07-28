"use client";

import { useState } from "react";

import { useToast } from "@/shared/components/ui/ToastProvider/ToastProvider";
import "./ingredient-tools.scss";

interface IngredientToolsProps {
  ingredients: string[];
  servings: number;
}

interface ParsedIngredient {
  displayText: string;
  parseable: boolean;
}

function parseQuantityValue(value: string): number | null {
  if (/^\d+\s+\d+\/\d+$/.test(value)) {
    const [wholePart, fractionPart] = value.split(/\s+/);
    const [numerator, denominator] = fractionPart.split("/").map(Number);

    if (!denominator) {
      return null;
    }

    return Number(wholePart) + numerator / denominator;
  }

  if (/^\d+\/\d+$/.test(value)) {
    const [numerator, denominator] = value.split("/").map(Number);
    return denominator ? numerator / denominator : null;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function formatQuantityValue(value: number): string {
  if (Number.isInteger(value)) {
    return `${value}`;
  }

  return `${Math.round(value * 100) / 100}`;
}

function scaleIngredient(ingredient: string, baseServings: number, nextServings: number) {
  const normalizedIngredient = ingredient.trim();
  const match = normalizedIngredient.match(
    /^((?:\d+\s+\d+\/\d+)|(?:\d+\/\d+)|(?:\d+(?:\.\d+)?))\s+(.+)$/
  );

  if (!match || baseServings <= 0) {
    return {
      displayText: normalizedIngredient,
      parseable: false,
    } satisfies ParsedIngredient;
  }

  const quantity = parseQuantityValue(match[1]);

  if (quantity === null) {
    return {
      displayText: normalizedIngredient,
      parseable: false,
    } satisfies ParsedIngredient;
  }

  const scaledQuantity = (quantity / baseServings) * nextServings;

  return {
    displayText: `${formatQuantityValue(scaledQuantity)} ${match[2]}`,
    parseable: true,
  } satisfies ParsedIngredient;
}

export function IngredientTools({ ingredients, servings }: IngredientToolsProps) {
  const [copied, setCopied] = useState(false);
  const [selectedServings, setSelectedServings] = useState(servings);
  const { showToast } = useToast();

  const displayedIngredients = ingredients.map((ingredient) =>
    scaleIngredient(ingredient, servings, selectedServings)
  );

  const handleCopyIngredients = async () => {
    await navigator.clipboard.writeText(
      displayedIngredients.map((ingredient) => ingredient.displayText).join("\n")
    );
    setCopied(true);
    showToast("Ingredients copied", "success");
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="ingredients-servings" aria-label="Serving size adjuster">
        <p>
          Adjust servings <strong>{selectedServings}</strong>
        </p>
        <div className="ingredients-servings__controls">
          <button
            type="button"
            onClick={() =>
              setSelectedServings((currentValue) => Math.max(1, currentValue - 1))
            }
            aria-label="Decrease servings"
          >
            -
          </button>
          <span>{selectedServings}</span>
          <button
            type="button"
            onClick={() => setSelectedServings((currentValue) => currentValue + 1)}
            aria-label="Increase servings"
          >
            +
          </button>
        </div>
      </div>
      <div className="ingredients-actions">
        <button
          type="button"
          className="copy-ingredients-button"
          onClick={handleCopyIngredients}
        >
          {copied ? "Copied" : "Copy Ingredients"}
        </button>
        <button type="button" className="print-ingredients-button" onClick={handlePrint}>
          Print Recipe
        </button>
      </div>
      <ul className="ingredients-list">
        {displayedIngredients.map((ingredient, index) => {
          const inputId = `ingredient-${ingredient.displayText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}-${index}`;

          return (
            <li key={`${ingredient.displayText}-${index}`}>
              <input type="checkbox" id={inputId} />
              <label htmlFor={inputId}>
                {ingredient.displayText}
                {!ingredient.parseable && selectedServings !== servings ? (
                  <span className="ingredient-note"> quantity unchanged</span>
                ) : null}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
