import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
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
});

const News = mongoose.model('News', newsSchema);

export default News;
