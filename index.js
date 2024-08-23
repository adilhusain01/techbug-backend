import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/dbConn.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logEvents.js';

import cardRoute from './routes/cardRoute.js';
import testimonialRoute from './routes/testimonialRoute.js';
import contactRoute from './routes/contactRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import workRoute from './routes/workRoute.js';
import tagRoute from './routes/tagRoute.js';
import newsLetterRoute from './routes/newsLetterRoute.js';
import blogpostRoute from './routes/blogpostRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import refreshRoute from './routes/refreshRoute.js';
import credentials from './middleware/credentials.js';
import corsOptions from './config/corsOptions.js';
import verifyJWT from './middleware/verifyJWT.js';

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(logger);

// app.use(credentials);
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/v1/api/cards', cardRoute);
app.use('/v1/api/testimonials', testimonialRoute);
app.use('/v1/api/contact', contactRoute);
app.use('/v1/api/services', serviceRoute);
app.use('/v1/api/works', workRoute);
app.use('/v1/api/tags', tagRoute);
app.use('/v1/api/newsletters', newsLetterRoute);
app.use('/v1/api/blogposts', blogpostRoute);
app.use('/v1/api/users', userRoute);
app.use('/v1/api/auth', authRoute);
app.use('/v1/api/refresh', refreshRoute);
app.all('*', (req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.use(verifyJWT);

mongoose.connection.once('open', () => {
  console.log(`Connected to mongoDB`);
  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
});
