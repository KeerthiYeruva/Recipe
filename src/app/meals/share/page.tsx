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
      <main className={"main-sm"}>
        <form className={"form"} action={formAction}>
          <div className={"row"}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="Image" name="image" />
          {state.status === "error" && (
            <div className="error-messages">
              {(state.errors ?? []).map((error, index) => (
                <p key={index} className="error">
                  {error}
                </p>
              ))}
            </div>
          )}
          <p className={"actions"}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
