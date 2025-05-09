import React from "react";
import Link from "next/link";

const Meal = ({ meal }) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <Link href={`/meals/${meal.id}`}>
        <h2 style={{
          color: "red",
          border: "2px solid lightgray",
          padding: "5px",
          borderRadius: "10px",
          display: "inline-block",
          cursor: "pointer"
        }}>
          {meal.title}
        </h2>
      </Link>
      <p>{meal.description}</p>
      <p>Price: {meal.price} DKK</p>
    </div>
  );
};

export default Meal;


