import Blogpost from '../model/blogpost.js';

export const getBlogposts = async (req, res) => {
  try {
    const blogposts = await Blogpost.find();

    if (!blogposts.length)
      return res.status(404).json({ message: 'Blogpost not found' });

    res.json(blogposts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogpostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'ID is required' });

    const foundBlogpost = await Blogpost.findById(id);

    if (!foundBlogpost)
      return res.status(404).json({ message: 'Blogpost not found' });

    res.json(foundBlogpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBlogpost = async (req, res) => {
  try {
    const { title, description, author, thumbnail, content, images_uri, tag } =
      req.body;

    if (!title || !description || !author || !thumbnail || !content || !tag)
      return res.status(400).json({
        message:
          'title, description, author, thumbnail, content and tag are required',
      });

    const newBlogpost = new Blogpost({
      title,
      description,
      author,
      thumbnail,
      content,
      images_uri,
      tag,
    });

    const savedBlogpost = await newBlogpost.save();

    res.status(201).json(savedBlogpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBlogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const updatedBlogpost = await Blogpost.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlogpost)
      return res.status(404).json({ message: 'Blogpost not found' });

    res.json(updatedBlogpost);
  } catch (error) {
    console.log(error);
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
      return res.status(404).json({ message: 'Blogpost not found' });

    res.json({ message: 'Blogpost deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
