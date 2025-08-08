import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const p = new Product(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

export default router;