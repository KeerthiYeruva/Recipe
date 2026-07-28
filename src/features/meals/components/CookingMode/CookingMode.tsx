"use client";

import { useEffect, useMemo, useState } from "react";

import "./cooking-mode.scss";

interface CookingModeProps {
  title: string;
  ingredients: string[];
  instructionSteps: string[];
}

export function CookingMode({ title, ingredients, instructionSteps }: CookingModeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
    () => new Set()
  );

  const progressLabel = useMemo(
    () => `${currentStepIndex + 1} of ${instructionSteps.length}`,
    [currentStepIndex, instructionSteps.length]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowRight") {
        setCurrentStepIndex((currentIndex) =>
          Math.min(instructionSteps.length - 1, currentIndex + 1)
        );
      }

      if (event.key === "ArrowLeft") {
        setCurrentStepIndex((currentIndex) => Math.max(0, currentIndex - 1));
      }
    };

    document.body.classList.add("cooking-mode-active");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("cooking-mode-active");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [instructionSteps.length, isOpen]);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((currentIngredients) => {
      const nextIngredients = new Set(currentIngredients);

      if (nextIngredients.has(index)) {
        nextIngredients.delete(index);
      } else {
        nextIngredients.add(index);
      }

      return nextIngredients;
    });
  };

  if (instructionSteps.length === 0) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="cooking-mode-trigger"
        onClick={() => {
          setCurrentStepIndex(0);
          setIsOpen(true);
        }}
      >
        Start Cooking
      </button>

      {isOpen ? (
        <div
          className="cooking-mode"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cooking-mode-title"
        >
          <div className="cooking-mode__header">
            <div>
              <p className="cooking-mode__eyebrow">Cooking mode</p>
              <h2 id="cooking-mode-title">{title}</h2>
            </div>
            <button
              type="button"
              className="cooking-mode__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close cooking mode"
            >
              Close
            </button>
          </div>

          <div className="cooking-mode__layout">
            {ingredients.length > 0 ? (
              <aside className="cooking-mode__ingredients" aria-label="Ingredients">
                <div className="cooking-mode__section-header">
                  <h3>Ingredients</h3>
                  <span>
                    {checkedIngredients.size}/{ingredients.length}
                  </span>
                </div>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={`${ingredient}-${index}`}>
                      <label>
                        <input
                          type="checkbox"
                          checked={checkedIngredients.has(index)}
                          onChange={() => toggleIngredient(index)}
                        />
                        <span>{ingredient}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}

            <section className="cooking-mode__step" aria-label="Current step">
              <div className="cooking-mode__section-header">
                <h3>Step {currentStepIndex + 1}</h3>
                <span>{progressLabel}</span>
              </div>
              <p>{instructionSteps[currentStepIndex]}</p>
              <div
                className="cooking-mode__progress"
                aria-hidden="true"
                style={{
                  ["--step-progress" as string]: `${
                    ((currentStepIndex + 1) / instructionSteps.length) * 100
                  }%`,
                }}
              />
              <div className="cooking-mode__controls">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStepIndex((currentIndex) => Math.max(0, currentIndex - 1))
                  }
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStepIndex((currentIndex) =>
                      Math.min(instructionSteps.length - 1, currentIndex + 1)
                    )
                  }
                  disabled={currentStepIndex === instructionSteps.length - 1}
                >
                  Next Step
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
