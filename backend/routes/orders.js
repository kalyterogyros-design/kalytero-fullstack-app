import express from 'express';
import Order from '../models/Order.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { items, total, customer } = req.body;
    const order = new Order({ items, total, customer });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find().sort('-createdAt');
    res.json(orders);
  } catch (err) { next(err); }
});

export default router;