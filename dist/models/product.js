import { Schema, model } from "mongoose";
const ProductSchema = new Schema({
    id: String,
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
});
const Product = model("products", ProductSchema);
export default Product;
