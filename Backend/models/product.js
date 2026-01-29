import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    inStock: { type: Boolean, default: true },
    image: { type: String, default: "" } // Path to the uploaded image
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
