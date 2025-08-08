import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import stripeRouter from './routes/stripe.js';
import errorHandler from './middleware/errorHandler.js';

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/stripe', stripeRouter);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Backend running on port', process.env.PORT || 5000)))
  .catch(err => console.error(err));