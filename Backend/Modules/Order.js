import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: String,
  quantity: Number,
  txHash: String,   // blockchain txn hash
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
