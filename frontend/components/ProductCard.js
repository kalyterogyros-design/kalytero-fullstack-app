import React, { useState } from 'react';
import { useDispatchCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const dispatch = useDispatchCart();
  const [extras, setExtras] = useState([]);
  const [removed, setRemoved] = useState([]);

  const toggleExtra = extra => {
    setExtras(prev => prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]);
  };
  const toggleRemove = ing => {
    setRemoved(prev => prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]);
  };

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product, extras, removedIngredients: removed, quantity: 1 } });
  };

  return (
    <div className="border p-4 rounded">
      <img src={product.image} alt={product.name} className="mb-2" />
      <h3 className="text-xl font-bold mb-1">{product.name}</h3>
      <p className="text-sm mb-1">{product.description}</p>
      <p className="font-semibold mb-2">{product.price.toFixed(2)} RON</p>

      {product.ingredients && (
        <div className="mb-2">
          <p className="font-semibold">Elimină:</p>
          {product.ingredients.map((ing, i) => (
            <label key={i} className="block text-sm">
              <input type="checkbox" checked={removed.includes(ing)} onChange={() => toggleRemove(ing)} /> {ing}
            </label>
          ))}
        </div>
      )}

      {product.extras && (
        <div className="mb-2">
          <p className="font-semibold">Extra:</p>
          {product.extras.map((ex, i) => (
            <label key={i} className="block text-sm">
              <input type="checkbox" onChange={() => toggleExtra(ex)} /> {ex.name} (+{ex.price.toFixed(2)} RON)
            </label>
          ))}
        </div>
      )}

      <button onClick={addToCart} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
        Adaugă în coș
      </button>
    </div>
  );
}