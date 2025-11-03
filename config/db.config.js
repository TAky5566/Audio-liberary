import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorLogger, accessLogger } from "../logger.js";

dotenv.config();

export default async function dbconnect() {
  try {
    await mongoose.connect(process.env.MongoURI);
    accessLogger.info("Database connected successfully");
  } catch (err) {
    errorLogger.error("Database connection failed", err);
    throw err;
  }
}

