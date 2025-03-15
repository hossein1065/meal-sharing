import express, { query } from "express";
import knex from "../database_client.js";

const mealRouter = express.Router();

// future-meals

mealRouter.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw("select title from Meal WHERE `when` > NOW()");
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


mealRouter.get("/meals", async (req, res) => {
  try {
    let query = knex("Meal");

    // Filter by maxPrice

    if (req.query.maxPrice) {
      query = query.where("price", "<=", Number(req.query.maxPrice));
    }

    // Filter by availableReservations

    if (req.query.availableReservations) {
      const available = req.query.availableReservations === "true";
      query = query.leftJoin("Reservation", "Meal.id", "=", "Reservation.meal_id")
                   .groupBy("Meal.id")
                   .havingRaw(available ? "SUM(Reservation.number_of_guests) < Meal.max_reservations" : "SUM(Reservation.number_of_guests) >= Meal.max_reservations");
    }

    // Filter by title

    if (req.query.title) {
      query = query.where("title", "like", `%${req.query.title}%`);
    }

    // Filter by dateAfter

    if (req.query.dateAfter) {
      query = query.where("when", ">", req.query.dateAfter);
    }

    // Filter by dateBefore

    if (req.query.dateBefore) {
      query = query.where("when", "<", req.query.dateBefore);
    }

    // Sorting by sortKey and sortDir

    if (req.query.sortKey) {
      const validKeys = ["when", "max_reservations", "price"];
      if (validKeys.includes(req.query.sortKey)) {
        const sortDirection = req.query.sortDir === "desc" ? "desc" : "asc";
        query = query.orderBy(req.query.sortKey, sortDirection);
      }
    }

    // Limit results

    if (req.query.limit) {
      query = query.limit(Number(req.query.limit));
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default mealRouter