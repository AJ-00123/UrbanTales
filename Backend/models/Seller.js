// models/Seller.js
import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String }, // optional in Google OAuth case
  googleId: { type: String }, // store if Google user
});

export default mongoose.model("Seller", sellerSchema);
