import React from 'react';
import { useDispatchCart } from '../context/CartContext';

export default function CartItem({ item, index }) {
  const dispatch = useDispatchCart();
  const removeItem = () => dispatch({ type: 'REMOVE_ITEM', payload: index });
  const extrasTotal = item.extras.reduce((sum, e) => sum + e.price, 0);

  return (
    <div className="flex justify-between items-start border-b py-2">
      <div className="flex-1">
        <h4 className="font-bold">{item.product.name}</h4>
        {item.removedIngredients.length > 0 && (
          <p className="text-sm text-gray-600">Eliminat: {item.removedIngredients.join(', ')}</p>
        )}
        {item.extras.length > 0 && (
          <p className="text-sm text-gray-600">Extra: {item.extras.map(e => e.name).join(', ')}</p>
        )}
        <p className="text-sm">Cantitate: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{((item.product.price + extrasTotal) * item.quantity).toFixed(2)} RON</p>
        <button onClick={removeItem} className="text-red-600 text-sm mt-1">Șterge</button>
      </div>
    </div>
  );
}