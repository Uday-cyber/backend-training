import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from "cookie-parser";

import userRoute from './routes/userRoute.js';
import taskRoute from './routes/taskRoute.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-frontend-lac-eight.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);  
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI)
.then(() => { console.log('Connected to database')})
.catch((err) => { console.error('MongoDB is not connected', err)})

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// app.use(express.static(path.join(process.cwd(), 'uploads')));

app.use('/users', userRoute);
app.use('/tasks', taskRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server on ${process.env.PORT}`);
});
