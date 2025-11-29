import { json } from "express";
import logger from "../utlis/logger.js";

export const errorHandler = (err, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} | ${err.message}`);

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Server Error",
    });
}