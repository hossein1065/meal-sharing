"use client"
import { useEffect, useState } from "react";
import React from "react";




 export default function MealsList(){
  const [meals, setMeals]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:3001/api/meal/all-meals")
    .then((res)=>res.json())
    .then((data)=>setMeals(data))
    .catch((err)=>console.log("Error fetching meals:", err));
  },[]);

return (
  <div>
    <h2>Meals</h2>
    {meals.length===0 ?(
      <p>No meals found.</p>
    ):(
      <ul>
        {meals.map((meal)=>(
          <li key={meal.id}>
            <p>{meal.title}</p>
            <p>{meal.description}</p>
            <p>Price:${meal.price}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

