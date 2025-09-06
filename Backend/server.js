import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import razorpayRoutes from './routes/razorpay.js';

dotenv.config(); // ✅ Must be before PORT or config

app.use('/api/razorpay', razorpayRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

