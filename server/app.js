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

app.use("/welcome", (req, res) => {
  res.send("Welcome to Learnify backend");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscRoutes);

app.all("*", (req, res) => {
  res
    .status(404)
    .send("Oops!! Nothing found here.Check the route and try again !!!");
});

app.use(errorMiddleware);

export default app;
