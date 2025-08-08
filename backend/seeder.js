import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany([
    {
      name: 'Burger gyros de porc',
      description: 'Chiflă, carne gyros de porc, salată mixtă',
      price: 16,
      ingredients: ['Cartofi prăjiți', 'Ceapă'],
      extras: [{ name: 'Brânză feta', price: 3 }],
      image: '/images/burger-porc.jpg'
    }
  ]);
  console.log('Seeding done');
  process.exit();
});