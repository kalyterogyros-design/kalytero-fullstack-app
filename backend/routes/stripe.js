import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/checkout', async (req, res, next) => {
  try {
    const { items } = req.body;
    const line_items = items.map(i => ({
      price_data: {
        currency: 'ron',
        product_data: { name: i.product.name },
        unit_amount: Math.round((i.product.price + (i.extras || []).reduce((sum,e)=>sum+e.price,0)) * 100)
      },
      quantity: i.quantity
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    });
    res.json({ id: session.id });
  } catch (err) { next(err); }
});

export default router;