import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  extras: [{ name: String, price: Number }],
  removedIngredients: [{ type: String }]
});

const OrderSchema = new mongoose.Schema({
  items: [CartItemSchema],
  total: Number,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);