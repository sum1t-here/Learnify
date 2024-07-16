import { v2 } from "cloudinary";
import connectionToDb from "./config/dbConnection.js";
import Razorpay from "razorpay";

import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import miscRoutes from "./routes/misc.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscRoutes);

app.use("/", (req, res) => {
  res.send("Welcome to Learnify backend");
});

app.all("*", (req, res) => {
  res
    .status(404)
    .send("Oops!! Nothing found here.Check the route and try again !!!");
});

app.use(errorMiddleware);

app.listen(port, async () => {
  await connectionToDb();
  console.log(`App is running at http://localhost:${port}`);
});
