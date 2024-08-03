import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  image_uri: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  tag: {
    type: String,
    required: true,
    trim: true,
  },
});

const Work = mongoose.model('Work', workSchema);

export default Work;
