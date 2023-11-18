import { Schema, model } from "mongoose";

interface IProduct {
  id?: String;
  name: String;
  description: String;
  price: Number;
  quantity: Number;
  location: String;
}

const ProductSchema = new Schema<IProduct>({
  id: String,
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
});

const Product = model<IProduct>("products", ProductSchema);

export default Product;
