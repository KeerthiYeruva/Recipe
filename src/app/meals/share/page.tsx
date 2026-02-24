"use client";

import shareMeal from "@/lib/actions";
import ImagePicker from "../../../Components/meals/ImagePicker/ImagePicker";
import "./share-meal.scss";
import { MealsFormSubmit } from "@/Components/meals/FormSubmit";
import { useFormState } from "react-dom";

// Define initial state
const initialState = { status: "", errors: [] as string[] };

export default function ShareMealPage() {
  // Use useFormState hook
  const [state, formAction] = useFormState(
    async (prevState: any, formData: any) => {
      const result = await shareMeal(prevState, formData);
      return result;
    },
    initialState
  );

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
              Recipe shared successfully! Thank you for contributing.
            </div>
          )}
          <p className={"actions"}>
            <MealsFormSubmit />
          </p>
        </form>
      </section>
    </>
  );
}
