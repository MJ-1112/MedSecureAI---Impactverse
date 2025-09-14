import mongoose from "mongoose";

const csvSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  batch: String,
  expiry: String,
  price: Number
});

export default mongoose.model("CsvData", csvSchema);
