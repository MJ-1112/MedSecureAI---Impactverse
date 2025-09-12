import mongoose from 'mongoose';

const csvDataSchema = new mongoose.Schema({
  fields: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CsvData', csvDataSchema);
