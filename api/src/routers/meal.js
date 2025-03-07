import express from "express";
import knex from "../database_client.js";

const mealRouter = express.Router();

mealRouter.get("/:id", async (req, res) => {
  const mealID = req.params.id;
  try {
    const meal_with_id = await knex("Meal").select("*").where({ id: mealID });
    if (meal_with_id.length === 0) {
      res
        .status(404)
        .json({ message: `can't find any meal with the id: ${req.params.id}` });
      return;
    }
    res.status(200).json(meal_with_id[0]);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default mealRouter;
