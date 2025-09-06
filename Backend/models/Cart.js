import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  image: String,
  qty: Number,
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);
