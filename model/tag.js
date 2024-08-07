import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
