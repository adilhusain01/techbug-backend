import Blogpost from '../model/blogpost.js';

export const getBlogposts = async (req, res) => {
  try {
    const posts = await Blogpost.find();

    if (!posts.length)
      return res.status(404).json({ message: 'No blog posts found' });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogpostsMeta = async (req, res) => {
  try {
    const posts = await Blogpost.find({}, 'thumbnail title author updatedAt')
      .sort({ updatedAt: -1 })
      .limit(10);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogpostMetaByTag = async (req, res) => {
  try {
    const { tags } = req.body;

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        message: 'Tags are required and should be an array',
      });
    }

    const posts = await Blogpost.find(
      { tags: { $in: tags } },
      'thumbnail title author updatedAt'
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogpostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'ID is required' });

    const post = await Blogpost.findById(id);

    if (!post) return res.status(404).json({ message: 'Blog post not found' });

    res.json(post);
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

    const existingPost = await Blogpost.findOne({ title });
    if (existingPost)
      return res.status(400).json({
        message: 'A blog post with this title already exists',
      });

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');

    const newPost = new Blogpost({
      title,
      description,
      author,
      thumbnail,
      tags,
      body,
      slug,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
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

    const updatedPost = await Blogpost.findByIdAndUpdate(
      id,
      { ...updates, slug, updatedAt: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost)
      return res.status(404).json({ message: 'Blog post not found' });

    res.json(updatedPost);
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

    const deletedPost = await Blogpost.findByIdAndDelete(id);

    if (!deletedPost)
      return res.status(404).json({ message: 'Blog post not found' });

    res.status(204).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
