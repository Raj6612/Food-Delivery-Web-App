import express from "express";
const router = express.Router();
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";

router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/get", authMiddleware, getCart);

export default router;
