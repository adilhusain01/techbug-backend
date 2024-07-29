import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  email: {
    
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    
  },
  message: {
    required: true,

  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
