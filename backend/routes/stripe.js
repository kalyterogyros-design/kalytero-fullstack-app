import express from 'express';
const router = express.Router();

router.post('/checkout', async (req, res) => {
  // If skip flag is set, bypass Stripe entirely
  if (process.env.SKIP_STRIPE === 'true') {
    return res.json({
      id: 'DUMMY_SESSION',
      url: `${process.env.CLIENT_URL}/success?session_id=DUMMY_SESSION`
    });
  }

  // …existing Stripe logic here (you can leave it as-is for when you add Stripe later)…
});

export default router;
