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
      trim: true,
    },

    author: {
      type: String,
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

    thumbnail: {
      type: String,
      trim: true,
    },

    tags: {
      type: [String],
    },

    body: {
      type: String,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

export default Blogpost;
