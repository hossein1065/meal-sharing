import React from "react";


const Meal = ({ meal }) => {
  return (
    <div style={{textAlign:"center"}}>  
      <h2 style={{color:"red", border:"5px solid #ccc", width:"150px", borderRadius:"20px" , margin:"0 auto"}}>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>Price: {meal.price} DKK</p>
    </div>
  );
};

export default Meal;

