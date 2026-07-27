import { MealShareForm } from "@/features/meals/components/MealShareForm/MealShareForm";
import "./share-meal.scss";

export default function ShareMealPage() {
  return (
    <>
      <header className={"header-sm"}>
        <h1>
          Share your <span className={"highlight"}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <section className={"main-sm"} aria-label="Share a meal form">
        <MealShareForm />
      </section>
    </>
  );
}
