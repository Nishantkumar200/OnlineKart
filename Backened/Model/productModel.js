import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    numRevies: { type: Number, required: true },
    brand: { type: String, required: false },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Products", productSchema);

export default productModel;
