import express from "express";
import knex from "../database_client.js";

const mealRouter = express.Router();

// mealRouter.get("/:id", async (req, res) => {
//   const mealID = req.params.id;
//   try {
//     const meal_with_id = await knex("Meal").select("*").where({ id: mealID });
//     if (meal_with_id.length === 0) {
//       res
//         .status(404)
//         .json({ message: `can't find any meal with the id: ${req.params.id}` });
//       return;
//     }
//     res.status(200).json(meal_with_id[0]);
//   } catch (error) {
//     console.error("Error fetching tables:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// future-meals

mealRouter.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw("select title from Meal  `when` > NOW()");
    res.json(meals[0]);
  } catch (error) {
    console.error("Now catching food has porblem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//past-meals

mealRouter.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
    res.json(meals[0]);
  } catch (error) {
    console.error("Error fetching past meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// all-meals

mealRouter.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id ASC");
    res.json(meals[0]);
  } catch (error) {
    console.error("Error fetching all meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// first-meal
mealRouter.get("/first-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if (meals[0].length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals[0][0]);
  } catch (error) {
    console.error("Error fetching first meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// last-meal
mealRouter.get("/last-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (meals[0].length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals[0][0]);
  } catch (error) {
    console.error("Error fetching last meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default mealRouter;
