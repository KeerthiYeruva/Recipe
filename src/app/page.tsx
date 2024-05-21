import Link from "next/link";

import "./page.scss";
import ImageSlideshow from "@/Components/slideshow/SlideShow";

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="slideshow">
          <ImageSlideshow />
        </div>
        <div>
          <div className="hero">
            <h1>Quick and Delicious Recipes for Busy Days</h1>
            <p>
              Short on time, not on flavor! Explore our quick recipes now. 🕒
            </p>
          </div>
          <div className="cta">
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className="section">
          <h2>Why?</h2>
          <p>
            These recipes are designed to be prepared quickly, making them ideal
            for people who are short on time but still want a home-cooked meal.
          </p>
          <p>
            The ingredients and steps are straightforward, which makes the
            cooking process easier and less stressful, perfect for busy
            schedules.
          </p>
          <p>
            Despite being quick and easy, these recipes do not compromise on
            taste, ensuring that you can enjoy a delicious meal even on your
            busiest days.
          </p>
        </section>
      </main>
    </>
  );
};
export default Home;
