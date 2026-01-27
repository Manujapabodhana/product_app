import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true } // adds createdAt, updatedAt
);

export default mongoose.model("Product", productSchema);
