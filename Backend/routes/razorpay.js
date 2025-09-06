import express from 'express';
import Razorpay from 'razorpay';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_QMG1XV6hszJZlA',
  key_secret: 'IASv4fXoVucMK1yez5JaBxcn',
});

router.post('/order', async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount < 100) {
    return res.status(400).json({ error: 'Invalid or too small amount' });
  }

  const options = {
    amount, // ✅ Already in paise, DON'T multiply again
    currency: 'INR',
    receipt: 'receipt#' + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // { id, amount, currency }
  } catch (err) {
    console.error('❌ Razorpay createOrder error:', err);
    res.status(500).json({ error: 'Server Error during order creation' });
  }
});

export default router;
