import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/products", productRoutes);

// error middleware (last)
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

// Start server and connect to database
const server = app.listen(PORT, async () => {
  console.log(`✅ API running: http://localhost:${PORT}`);
  
  // Connect to MongoDB after server starts
  await connectDB();
});

