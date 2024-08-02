import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  features: {
    type: [String],
    required: true,
  },

  image: {
    type: String,
    required: true,
    trim: true,
  },
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
