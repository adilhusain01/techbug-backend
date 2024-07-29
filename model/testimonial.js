import mongoose from 'mongoose';

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },

  image_uri: {
    type: String,
    required: true,
  },

  review: {
    type: String,
    required: true,
  },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
