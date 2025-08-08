import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import api from '../utils/api';

export default function CartPage() {
  const { items } = useCart();
  const handleCheckout = async () => {
    const { data } = await api.post('/stripe/checkout', { items });
    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  const total = items.reduce((sum, i) => sum + (i.product.price + i.extras.reduce((s, e) => s + e.price, 0)) * i.quantity, 0);

  return (
    <div className="p-4">
      {items.length === 0 && <p>Coșul este gol.</p>}
      {items.map((item, i) => <CartItem key={i} item={item} index={i} />)}
      {items.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-4">Total: {total.toFixed(2)} RON</h3>
          <button onClick={handleCheckout} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Finalizează comanda</button>
        </>
      )}
    </div>
  );
}