import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  image_uri: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
