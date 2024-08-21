import Blogpost from '../model/blogpost.js';
import Tag from '../model/tag.js';

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
    const posts = await Blogpost.find(
      {},
      'thumbnail title author updatedAt slug published'
    ).sort({ updatedAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogpostMetaByTag = async (req, res) => {
  try {
    const { tags } = req.params;

    if (!tags || typeof tags !== 'string' || tags.trim() === '') {
      return res.status(400).json({
        message: 'Tags are required and should be a non-empty string',
      });
    }

    const tagsArray = tags.split('-');

    const posts = await Blogpost.find(
      { tags: { $in: tagsArray } },
      'thumbnail title author updatedAt slug published'
    ).limit(15);

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

export const getBlogpostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) return res.status(400).json({ message: 'Slug is required' });

    const post = await Blogpost.findOne({ slug: slug });

    if (!post) return res.status(404).json({ message: 'Blog post not found' });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBlogpost = async (req, res) => {
  try {
    const { title, description, author, thumbnail, tags, body, published } =
      req.body;

    if (
      published === true &&
      (!title || !description || !author || !thumbnail || !body)
    ) {
      return res.status(400).json({
        message: 'Title, description, author, thumbnail, and body are required',
      });
    } else {
      if (!title || !thumbnail)
        return res.status(400).json({
          message: 'Title & Thumbnail is required',
        });
    }

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');

    const existingPost = await Blogpost.findOne({ slug });
    if (existingPost)
      return res.status(400).json({
        message: 'A blog post with this title already exists',
      });

    for (const tag of tags) {
      const existingTag = await Tag.findOne({ name: tag });
      if (!existingTag) {
        const newTag = new Tag({ name: tag });
        await newTag.save();
      }
    }

    const newPost = new Blogpost({
      title,
      description,
      author,
      thumbnail,
      tags,
      body,
      slug,
      published,
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

    const tagsArray = updates.tags ? updates.tags : undefined;

    if (tagsArray) {
      for (const tag of tagsArray) {
        const existingTag = await Tag.findOne({ name: tag });
        if (!existingTag) {
          const newTag = new Tag({ name: tag });
          await newTag.save();
        }
      }
    }

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

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
