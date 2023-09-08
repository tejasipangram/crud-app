import express from "express";
import { getUsers } from "../controller/userController.js";
const router = express.Router();

router.route("/user").get(getUsers);
export default router;
