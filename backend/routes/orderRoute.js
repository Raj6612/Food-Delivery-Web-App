import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyPayment,
} from "../controllers/orderController.js";

router.post("/place", authMiddleware, placeOrder);
router.post("/paymentVerification", verifyPayment);
router.post("/userorders", authMiddleware, userOrders);
router.get("/list", listOrders);
router.post("/status", updateStatus);

export default router;
