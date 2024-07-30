import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  company: {
    type: String,
    trim: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
