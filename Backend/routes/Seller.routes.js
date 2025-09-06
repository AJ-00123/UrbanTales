// routes/seller.routes.js
import express from "express";
import { sellerSignup, sellerLogin } from "../controllers/Seller.controller.js ";

const router = express.Router();

router.post("/signup", sellerSignup);
router.post("/login", sellerLogin);

export default router;
