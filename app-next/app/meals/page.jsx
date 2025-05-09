"use client";
import React from "react";
import MealsList from "@/components/MealsList/MealsList";

const MealsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>All Meals</h1>
      <p style={{ textAlign: "center" }}>Browse all available meals and pick your favorite!</p>
      
    
      <MealsList />
    </div>
  );
};

export default MealsPage;
