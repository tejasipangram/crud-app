import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDb } from "./config/db.js";
export const app = express();
import cors from "cors";
dotenv.config({ path: "./config/.env" });
app.use(cors({ origin: process.env.ORIGIN }));
app.use(bodyParser.json());
import ListRoutes from "./routes/operation.js";
import bodyParser from "body-parser";

app.use("/static", express.static(path.join(__dirname, "upload")));

app.use("/", ListRoutes);
connectDb();
app.listen(process.env.PORT, () => {
  console.log("server started at " + process.env.PORT);
});
