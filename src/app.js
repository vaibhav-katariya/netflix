import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Router

import movieRouter from "./routes/movie.route.js";
import userRouter from "./routes/user.route.js"


app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/user", userRouter)


export { app };
