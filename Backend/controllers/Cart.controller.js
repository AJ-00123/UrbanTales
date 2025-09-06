import Cart from "../models/Cart.js";

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  const { item } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [item] });
    } else {
      const existingItem = cart.items.find((i) => i.id === item.id);
      if (existingItem) existingItem.qty += item.qty;
      else cart.items.push(item);
    }

    await cart.save();
    res.status(200).json({ msg: "Item added", cart });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Remove item
export const removeFromCart = async (req, res) => {
  const { itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter((item) => item.id !== itemId);
    await cart.save();
    res.status(200).json({ msg: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update quantity
export const updateQtyInCart = async (req, res) => {
  const { itemId, qty } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    item.qty = qty;
    await cart.save();
    res.status(200).json({ msg: "Quantity updated", cart });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
