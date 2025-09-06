import express from 'express';
import Product from '../models/product.js';

import { getAllProducts, createProduct, deleteProduct } from '../controllers/Product.controller.js';

const router = express.Router();

router.get('/products/:category', async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category: category.toLowerCase() });
  res.json(products);
});

router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct); // optional for remove

export default router;
