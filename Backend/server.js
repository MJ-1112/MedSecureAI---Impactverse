import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.js';
import profileRoutes from './Routes/profile.js';
import csvRoutes from './Routes/csv.js';
import orderRoutes from './Routes/orders.js';
import verifyRoutes from './Routes/verify.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/csv', csvRoutes);
app.use('/orders', orderRoutes);
app.use('/verify', verifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
