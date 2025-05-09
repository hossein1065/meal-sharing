"use client"
import React, { useEffect, useState } from "react";

import MealsList from "../MealsList/MealsList";
import Image from "next/image";
import HYFLogo from "@/assets/hyf.svg";
import "./HomePage.css";

function HomePage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
  
    fetch("http://localhost:3001/api/meal/meals?limit=3")
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

  return (
    <div>
     
      <nav className="menu">
        <a href="/" className="menu-link">Home</a>
        <a href="/meals" className="menu-link">Meals</a>
      </nav>

      <div className="logo-container">
        <Image
          src={HYFLogo.src}
          width={HYFLogo.width}
          height={HYFLogo.height}
          alt="Hack Your Future Logo"
          className="logo"
        />
      </div>

      {/* Title and Subtitle */}
      <h1 className="main-title">Meal Sharing App</h1>
      <p className="sub-title">Find and reserve your next delicious meal!</p>

      {/* Meals Preview */}
      <MealsList meals={meals} />

      {/* Button to all meals */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a href="/meals" className="see-more-button">See all meals</a>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Meal Sharing App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;


