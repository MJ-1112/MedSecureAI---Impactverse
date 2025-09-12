import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'authforclients' },
  contractAddress: String,
  amount: Number,
  status: { type: String, enum:['pending','completed','failed'], default:'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
