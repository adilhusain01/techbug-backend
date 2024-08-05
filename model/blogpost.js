import mongoose from 'mongoose';

const bodyBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'subheading', 'image'],
    required: true,
  },
  content: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return this.type !== 'paragraph' || v != null;
      },
      message: 'Content is required for paragraphs',
    },
  },
  subheading: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return this.type !== 'subheading' || v != null;
      },
      message: 'Subheading is required for subheadings',
    },
  },
  image_uri: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return this.type !== 'image' || v != null;
      },
      message: 'Image URL is required for images',
    },
  },
});

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

    slug: {
      type: String,
      required: true,
      trim: true,
    },

    tags: [String],

    body: {
      type: [bodyBlockSchema],
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

export default Blogpost;
