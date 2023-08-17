import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDb } from "./config/db.js";
export const app = express();
import cors from "cors";
dotenv.config({ path: "./config/.env" });
app.use(cors({ origin: process.env.ORIGIN }));
app.use(bodyParser.json());
import ListRoutes from "./routes/operation.js";
import bodyParser from "body-parser";
app.use("/", ListRoutes);
connectDb();
app.listen(process.env.PORT, () => {
  console.log("server started at " + process.env.PORT);
});
