// before:
stripe.redirectToCheckout({ sessionId: data.id });

// after:
if (data.id === 'DUMMY_SESSION') {
  // Skip actual Stripe and go straight to success
  window.location.href = data.url;
} else {
  const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  stripe.redirectToCheckout({ sessionId: data.id });
}
