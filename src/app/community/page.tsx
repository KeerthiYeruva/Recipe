import Image from "next/image";

import mealIcon from "@/assets/icons/meal.png";
import communityIcon from "@/assets/icons/community.png";
import eventsIcon from "@/assets/icons/events.png";
import "./community-page.scss";

const CommunityPage = () => {
  return (
    <>
      <header className="header-c">
        <h1>
          One shared passion: <span className={"highlight-c"}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={"main-c"}>
        <h2>Community Perks</h2>

        <ul className={"perks-c"}>
          <li>
            <Image src={mealIcon} alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
            />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
};

export default CommunityPage;
