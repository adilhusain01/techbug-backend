import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/dbConn.js';
import mongoose from 'mongoose';

import cardRoute from './routes/cardRoute.js';
import testimonialRoute from './routes/testimonialRoute.js';
import contactRoute from './routes/contactRoute.js';
import authRoute from './routes/authRoute.js';

const PORT = 8000 || process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use('/api/v1/cards', cardRoute);
app.use('/api/v1/testimonials', testimonialRoute);
app.use('/api/v1/contact', contactRoute);
app.use('/api/v1/auth', authRoute);

mongoose.connection.once('open', () => {
  console.log(`Connected to mongoDB`);
  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
});
