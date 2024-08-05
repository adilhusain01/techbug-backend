import Blogpost from '../model/blogpost.js';

export const getBlogposts = async (req, res) => {
  try {
    const Blogposts = await Blogpost.find();

    if (!Blogposts.length)
      return res.status(404).json({ message: 'No blog posts found' });

    res.json(Blogposts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogpostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'ID is required' });

    const Blogpost = await Blogpost.findById(id);

    if (!Blogpost)
      return res.status(404).json({ message: 'Blog post not found' });

    res.json(Blogpost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBlogpost = async (req, res) => {
  try {
    const { title, description, author, thumbnail, tags, body } = req.body;

    if (!title || !description || !author || !thumbnail || !body)
      return res.status(400).json({
        message: 'Title, description, author, thumbnail, and body are required',
      });

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');

    const newBlogpost = new Blogpost({
      title,
      description,
      author,
      thumbnail,
      tags,
      body,
      slug,
    });

    const savedBlogpost = await newBlogpost.save();

    res.status(201).json(savedBlogpost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBlogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const slug = updates.title
      ? updates.title
          .split(' ')
          .join('-')
          .toLowerCase()
          .replace(/[^a-zA-Z0-9-]/g, '-')
      : undefined;

    const updatedBlogpost = await Blogpost.findByIdAndUpdate(
      id,
      { ...updates, slug, updatedAt: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlogpost)
      return res.status(404).json({ message: 'Blog post not found' });

    res.json(updatedBlogpost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBlogpost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const deletedBlogpost = await Blogpost.findByIdAndDelete(id);

    if (!deletedBlogpost)
      return res.status(404).json({ message: 'Blog post not found' });

    res.status(204).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
