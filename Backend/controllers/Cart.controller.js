import Cart from "../models/Cart.js";

// Add to cart
export const addToCart = async (req, res) => {
  const { userId, item } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [item] });
    } else {
      const existingItem = cart.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();
    res.status(200).json({ msg: "Item added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ items: [] }); // Return empty cart if not found
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Remove item
export const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
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
  const { userId, itemId, qty } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
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
