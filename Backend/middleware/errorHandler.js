import mongoose from "mongoose";

export function errorHandler(err, req, res, next) {
  console.error(err);

  // invalid Mongo ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  // mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  res.status(500).json({ success: false, message: "Server error" });
}
