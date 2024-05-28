"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import CheesyCornBites from "@/assets/cheesy-corn-bites.jpg";
import MinuteOvernightOats from "@/assets/overnight-oats.jpg";
import RagiChocolateMugCake from "@/assets/ragi-chocolate-mug-cake.jpg";
import OatsAppleWaffles from "@/assets/waffles.jpg";
import HealthiestChocolateIceCream from "@/assets/chocolate-ice-cream.jpg";
import ZeroCreamMangoMousse from "@/assets/mango-mousse.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";

import "./slideshow.scss";

const images = [
  { img: CheesyCornBites, alt: "Cheesy Corn Bites" },
  { img: OatsAppleWaffles, alt: "Oats Apple Waffles" },
  { img: RagiChocolateMugCake, alt: "Ragi Chocolate Mug Cake" },
  { img: MinuteOvernightOats, alt: "5-Minute Overnight Oats" },
  {
    img: HealthiestChocolateIceCream,
    alt: "Healthiest Chocolate Ice Cream",
  },
  { img: ZeroCreamMangoMousse, alt: "Zero Cream Mango Mousse" },
  { img: tomatoSaladImg, alt: "Fresh Tomato Salad" }, // Adjusted the image import name to match
];

const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-i">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.img}
          className={index === currentImageIndex ? "active" : ""}
          alt={image.alt}
          fill
        />
      ))}
    </div>
  );
};
export default ImageSlideshow;
