import { create } from "../controller/create.js";
import { deleteList } from "../controller/delete.js";
import { read } from "../controller/read.js";
import { udpate } from "../controller/update.js";
import express from "express";
import { handleMulterError, upload } from "../middleware/upload.js";
const router = express.Router();

//all the routes

router.route("/create").post(upload.single("image"), handleMulterError, create);
router
  .route("/update/:id")
  .put(upload.single("image"), handleMulterError, udpate);
router.route("/delete/:id").delete(deleteList);
router.route("/read").get(read);

export default router;
