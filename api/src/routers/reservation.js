import express from "express";
import knex from "../database_client.js";

const reservationRouter = express.Router();

// POST /api/reservations - Create a new reservation
reservationRouter.post("/", async (req, res) => {
  const { name, phone, number_of_guests, meal_id } = req.body;

  if (!name || !phone || !number_of_guests || !meal_id) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    await knex("Reservation").insert({
      contact_name: name,
      contact_phonenumber: phone,
      number_of_guests: Number(number_of_guests),
      meal_id: Number(meal_id),
      created_date: new Date(),
    });

    res.status(201).json({ message: "Reservation created successfully!" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default reservationRouter;
