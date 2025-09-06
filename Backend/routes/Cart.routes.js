import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQtyInCart
} from "../controllers/Cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.post("/remove", removeFromCart);
router.post("/update", updateQtyInCart);

export default router;
