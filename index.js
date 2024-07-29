import express from 'express';
import mongoose from 'mongoose';
import homeRoutes from './routes/home.route.js';
import contactRoutes from './routes/contact.route.js';
import authRoutes from './routes/auth.route.js';


const PORT = 8000;
const app = express();
app.use(express.json());
app.use("/api/home",homeRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api/auth", authRoutes);


const start = () => {
  mongoose
    .connect(
      `mongodb+srv://techbug:techbug@cluster0.s1todyo.mongodb.net/techbug?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
      console.log(`Connected to mongoDB`);
      app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
      });
    });
};

start();
