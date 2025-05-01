

"use client";

import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HomePage.css";
import MealsList from "../MealsList/MealsList";

function HomePage() {
  return (
    <>
      <a href="https://www.hackyourfuture.dk/" target="_blank" className="link">
        <Image
          src={HYFLogo.src}
          width={HYFLogo.width}
          height={HYFLogo.height}
          className="logo"
          alt="HYF logo"
        />
      </a>
      <a href="/nested" className="link">
        <span className="message">Go to the nested page</span>
      </a>
      <MealsList />
    </>
  );
}

export default HomePage;

