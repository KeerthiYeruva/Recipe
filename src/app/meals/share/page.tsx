"use client";

import { shareMealAction } from "@/features/meals/actions/share-meal.action";
import { ImagePicker } from "@/features/meals/components/ImagePicker/ImagePicker";
import "./share-meal.scss";
import { MealFormSubmit } from "@/features/meals/components/MealFormSubmit/MealFormSubmit";
import type { FormState } from "@/shared/types/form.types";
import { useFormState } from "react-dom";

// Define initial state
const initialState: FormState = { status: "", errors: [] };

export default function ShareMealPage() {
  // Use useFormState hook
  const [state, formAction] = useFormState(shareMealAction, initialState);

  return (
    <>
      <header className={"header-sm"}>
        <h1>
          Share your <span className={"highlight"}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <section className={"main-sm"} aria-label="Share a meal form">
        <form className={"form"} action={formAction}>
          <fieldset>
            <legend className="sr-only">Creator Information</legend>
            <div className={"row"}>
              <p>
                <label htmlFor="name">Your name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
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
                  aria-label="Your email address"
                  required 
                />
              </p>
            </div>
          </fieldset>
          <fieldset>
            <legend className="sr-only">Recipe Details</legend>
            <p>
              <label htmlFor="title">Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                aria-label="Recipe title"
                required 
              />
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
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </p>
              <p>
                <label htmlFor="difficulty">Difficulty</label>
                <select id="difficulty" name="difficulty" required>
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
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
              <h2 className="sr-only">Form submission errors</h2>
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
          <p className={"actions"}>
            <MealFormSubmit />
          </p>
        </form>
      </section>
    </>
  );
}
