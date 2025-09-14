import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  region: { 
    type: String, 
    enum: [
      "North India", "South India", "East India",
      "West India", "Central India", "North-East India"
    ], 
    required: true 
  },
  role: { type: String, enum: ["chemist", "supplier"], required: true },
  verified: { type: Boolean, default: false },
  ipfsHash: { type: String, default: "" },
  photo: { type: String, default: "" },
  joined: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
