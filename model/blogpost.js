import mongoose from 'mongoose';

const blogpostSchema = new mongoose.Schema({
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

  author: {
    type: String,
    required: true,
    trim: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },

  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    required: true,
  },

  images_uri: [
    {
      type: String,
      trim: true,
    },
  ],

  tag: {
    type: String,
    trim: true,
    required: true,
  },
});

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

export default Blogpost;
