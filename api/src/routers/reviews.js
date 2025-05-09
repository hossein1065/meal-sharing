import express from 'express';
import knex from '../database_client.js';
 const reviewRouter  = express.Router();

// all-reviews
reviewRouter.get('/reviews', async (req, res) => {
  try {
    const reviews = await knex(`Review`).select(`*`);
    res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  //especific-meal-review
  reviewRouter.get("/meals/:meal_id/reviews", async (req, res) => {
    const { meal_id } = req.params;
    try {
      const reviews = await knex('Review').where('meal_id',req.params.meal_id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews for meal:", error);
      res.status(500).json({ error: "internal Server Error"});
    }
  });



  //create new review

  reviewRouter.post("/reviews", async (req, res) => {
    const { meal_id, rating, comment } = req.body;

    if (!meal_id || !rating || !comment) {
        return res.status(400).json({ error: "meal_id, rating, and comment are required" });
    }

    try {
      
        const [newReview] = await knex("Review").insert({ meal_id, rating, comment }).returning("*");

        res.status(201).json({
            message: "Review created successfully",
            review: newReview
        });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



  // get a review by id
  reviewRouter.get("/reviews/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const review = await knex('Review').where('id', id).first();
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      console.error("Error fetching review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });




  //update a review by id
  reviewRouter.put("/reviews/:id", async (req, res) => {
    try {
      const updated = await knex("Review").where("id", req.params.id).update(req.body);
      if (updated) {
        res.json({ message: "Review updated successfully" });
      } else {
        res.status(404).json({ message: "Review not found" });
      }
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // delete review by id
  reviewRouter.delete("/reviews/:id", async (req, res) => {
    
    try {
      const deletedReview = await knex('Review').where('id',req.params.id).del();
  
      if (deletedReview === 0) {
        return res.status(404).json({ message: "comment not found" });
      }
  
      res.json({ message: "comment successfully deleted" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: "Internal sever Error" });
    }
  });
  
  export default reviewRouter;