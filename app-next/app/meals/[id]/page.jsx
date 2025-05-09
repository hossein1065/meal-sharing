"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function MealDetailsPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
    number_of_guests: 1,
  });
  const [reviewData, setReviewData] = useState({
    rating: "",
    comment: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/meal/meals/${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data))
      .catch((err) => console.error("Error fetching meal details:", err));

    fetch(`http://localhost:3001/api/reviews/meals/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    const reservation = {
      meal_id: parseInt(id),
      ...formData,
      number_of_guests: Number(formData.number_of_guests),
    };

    try {
      const res = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      if (!res.ok) throw new Error("Reservation failed");
      alert("Reservation submitted!");
    } catch (err) {
      console.error("Error submitting reservation:", err);
      alert("Something went wrong.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reviewData, meal_id: parseInt(id) }),
      });

      if (!res.ok) throw new Error("Failed to submit review");
      const result = await res.json();
      setReviews((prev) => [...prev, result.review]);
      setReviewData({ rating: "", comment: "" });
      alert("Review submitted!");
    } catch (error) {
      console.error("Review submission error:", error);
      alert("Error submitting review");
    }
  };

  if (!meal) return <p>Loading meal...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>
      <p>Date: {new Date(meal.when).toLocaleString()}</p>
      <p>Price: {meal.price} DKK</p>
      <hr />

      {/* Reservation Form */}
      <h2>Make a Reservation</h2>
      <p><strong>Capacity:</strong> {meal.max_reservations} guests</p>
      <form
        onSubmit={handleReservationSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
      >
        <input
          type="text"
          placeholder="Your name"
          name="contact_name"
          required
          value={formData.contact_name}
          onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone number"
          name="contact_phonenumber"
          required
          value={formData.contact_phonenumber}
          onChange={(e) => setFormData({ ...formData, contact_phonenumber: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          name="contact_email"
          required
          value={formData.contact_email}
          onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Number of guests"
          name="number_of_guests"
          min="1"
          required
          value={formData.number_of_guests}
          onChange={(e) => setFormData({ ...formData, number_of_guests: e.target.value })}
        />
        <button type="submit">Reserve</button>
      </form>

      {/* Reviews */}
      <hr />
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
            <strong>Rating:</strong> {r.rating} / 5
            <br />
            <em>{r.comment}</em>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {/* Review Form */}
      <h3>Leave a Review</h3>
      <form
        onSubmit={handleReviewSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
      >
        <input
          type="number"
          placeholder="Rating (1-5)"
          name="rating"
          required
          min="1"
          max="5"
          value={reviewData.rating}
          onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
        />
        <textarea
          placeholder="Comment"
          name="comment"
          required
          value={reviewData.comment}
          onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default MealDetailsPage;
