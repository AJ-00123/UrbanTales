import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQtyInCart
} from "../controllers/Cart.controller.js";

const router = express.Router();

// ✅ All routes now rely on JWT for userId
router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.post("/remove", verifyToken, removeFromCart);
router.post("/update", verifyToken, updateQtyInCart);

export default router;
