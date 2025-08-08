import mongoose from 'mongoose';

const ExtraSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  ingredients: [{ type: String }],
  extras: [ExtraSchema],
  image: String
});

export default mongoose.model('Product', ProductSchema);