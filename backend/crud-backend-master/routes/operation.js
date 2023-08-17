import { create } from "../controller/create.js";
import { deleteList } from "../controller/delete.js";
import { read } from "../controller/read.js";
import { udpate } from "../controller/update.js";
import express from "express";
const router = express.Router();

//all the routes

router.route("/create").post(create);
router.route("/update/:id").put(udpate);
router.route("/delete/:id").delete(deleteList);
router.route("/read").get(read);

export default router;
