import mongoose from 'mongoose';

const blogpostSchema = new mongoose.Schema(
  {
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

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
    },

    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      required: true,
    },

    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

export default Blogpost;
