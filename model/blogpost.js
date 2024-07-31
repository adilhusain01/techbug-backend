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

  tags: [
    {
      type: String,
      trim: true,
    },
  ],

  slug: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

export default Blogpost;
