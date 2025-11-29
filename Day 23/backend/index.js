import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";
import rateLimit from "express-rate-limit";

import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import logger from "./utlis/logger.js";
import http from "http";
import { socketHandler } from "./socket.js";

import "./cron/autoTasks.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

export { io };

socketHandler(io);

app.set("trust proxy", 1);

process.on("uncaughtException", (err) => {
  console.log("💥 UNCAUGHT EXCEPTION", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("💥 UNHANDLED REJECTION", err);
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-frontend-lac-eight.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman/server allowed
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());


app.use(helmet());             
app.use(mongoSanitize());      
app.use(xss());                
app.use(hpp());                


app.use(compression());        

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   
  max: 100,                   
  message: { error: "Too many requests, try again later." },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 7,                     
  message: { error: "Too many login attempts. Try again later." },
});

app.use("/users/login", loginLimiter);
app.use(generalLimiter);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(requestLogger);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use("/users", userRoute);
app.use("/tasks", taskRoute);

app.get("/async-test", async (req, res) => {
  throw new Error("Async Failed");
});


app.use(errorHandler);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });

server.listen(process.env.PORT, () => {
  logger.info(`Server is running on PORT ${process.env.PORT}`);
});

// app.listen(process.env.PORT, () => {
//     logger.info(`Server is running on PORT ${process.env.PORT}`);
// });
