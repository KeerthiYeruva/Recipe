"use client";

import { useFormState } from "react-dom";

import { shareMealAction } from "../../actions/share-meal.action";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { MealFormSubmit } from "../MealFormSubmit/MealFormSubmit";
import type { FormState } from "@/shared/types/form.types";
import { MEAL_CATEGORIES, MEAL_DIFFICULTIES } from "../../constants/meal.constants";

const initialState: FormState = { status: "", errors: [] };

export function MealShareForm() {
  const [state, formAction] = useFormState(shareMealAction, initialState);

  return (
    <form className="form" action={formAction}>
      <fieldset className="form-card">
        <legend>About you</legend>
        <p className="fieldset-copy">
          Add your name and email so the recipe still feels personal and traceable.
        </p>
        <div className="row">
          <p>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Keerthi"
              aria-label="Your full name"
              required
            />
          </p>
          <p>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="cook@example.com"
              aria-label="Your email address"
              required
            />
          </p>
        </div>
      </fieldset>
      <fieldset className="form-card">
        <legend>Recipe details</legend>
        <p className="fieldset-copy">
          Keep the summary concise and write the instructions exactly how you would want
          someone else to follow them.
        </p>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" aria-label="Recipe title" required />
        </p>
        <p>
          <label htmlFor="summary">Short Summary</label>
          <input
            type="text"
            id="summary"
            name="summary"
            aria-label="Brief recipe summary"
            required
          />
        </p>
        <div className="row">
          <p>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="">Select category</option>
              {MEAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty" required>
              <option value="">Select difficulty</option>
              {MEAL_DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </p>
        </div>
        <div className="row">
          <p>
            <label htmlFor="prep_time">Prep Time</label>
            <input
              type="number"
              id="prep_time"
              name="prep_time"
              min="1"
              placeholder="10"
              required
            />
          </p>
          <p>
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              id="servings"
              name="servings"
              min="1"
              placeholder="2"
              required
            />
          </p>
          <p>
            <label htmlFor="calories">Calories</label>
            <input
              type="number"
              id="calories"
              name="calories"
              min="1"
              placeholder="250"
              required
            />
          </p>
        </div>
        <p>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows={10}
            aria-label="step-by-step recipe instructions"
            required
          ></textarea>
        </p>
        <ImagePicker label="Image" name="image" />
      </fieldset>
      {state.status === "error" && (
        <div className="error-messages" role="alert">
          <h2>There are a few things to fix before sharing.</h2>
          {(state.errors ?? []).map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        </div>
      )}
      {state.status === "success" && (
        <div className="success-message" role="status">
          {state.message ?? "Recipe shared successfully! Thank you for contributing."}
        </div>
      )}
      <p className="actions">
        <MealFormSubmit />
      </p>
    </form>
  );
}
