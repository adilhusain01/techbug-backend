import mongoose from 'mongoose';

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  designation: {
    type: String,
    required: true,
    trim: true,
  },

  image_uri: {
    type: String,
    required: true,
    trim: true,
  },

  review: {
    type: String,
    required: true,
    trim: true,
  },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
