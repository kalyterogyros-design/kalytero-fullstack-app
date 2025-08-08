import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.get('/products').then(res => setProducts(res.data)); }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}