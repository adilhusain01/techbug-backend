const express = require('express');
const mongoose = require('mongoose');

const PORT = 8000;
const app = express();

app.get('/v1/api', (req, res) => {
  res.end('This is the endpoint');
});

// app.get('/v1/api/cards', (req, res) => {
//   const cards =
// })

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
