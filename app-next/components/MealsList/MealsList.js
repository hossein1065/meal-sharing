
import React, { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import Link from "next/link";

const MealsList = ({ meals: passedMeals }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passedMeals && passedMeals.length > 0) {
      
      setMeals(passedMeals);
      setLoading(false);
    } else {
      
      fetch("http://localhost:3001/api/meal/meals")
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => setMeals(data))
        .catch((err) => {
          console.error("Fetch error:", err);
          setError("Failed to load meals.");
        })
        .finally(() => setLoading(false));
    }
  }, [passedMeals]);

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {meals.length > 0 ? (
        meals.map((meal) => <Meal key={meal.id} meal={meal} />)
      ) : (
        <p>No meals found.</p>
      )}
    </div>
  );
};

export default MealsList;
