import "dotenv/config";
import express from "express";
import cors from "cors";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import mealRouter from "./routers/meal.js";
import reviewsRouter from "./routers/reviews.js";
import reservationRouter from "./routers/reservation.js";

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();


apiRouter.use("/nested", nestedRouter);
apiRouter.use("/meal", mealRouter);
apiRouter.use("/reviews", reviewsRouter);

app.use("/api", apiRouter);
app.use("/api/reservations", reservationRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
