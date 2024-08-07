import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/dbConn.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { logger } from './middleware/logEvents.js';

//Route Imports
import cardRoute from './routes/cardRoute.js';
import testimonialRoute from './routes/testimonialRoute.js';
import contactRoute from './routes/contactRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import workRoute from './routes/workRoute.js';
import authRoute from './routes/authRoute.js';
import blogpostRoute from './routes/blogpostRoute.js';
import newsRoute from './routes/newsRoute.js';

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(logger);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1/api/cards', cardRoute);
app.use('/v1/api/testimonials', testimonialRoute);
app.use('/v1/api/contact', contactRoute);
app.use('/v1/api/services', serviceRoute);
app.use('/v1/api/works', workRoute);
app.use('/v1/api/news', newsRoute);
app.use('/v1/api/blogposts', blogpostRoute);
app.use('/v1/api/auth', authRoute);

mongoose.connection.once('open', () => {
  console.log(`Connected to mongoDB`);
  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
});
