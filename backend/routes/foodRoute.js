import express from "express";
const router = express.Router();
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

import { storage } from "../config/cloudConfig.js";
const upload = multer({ storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

export default router;
