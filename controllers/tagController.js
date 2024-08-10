import Tag from '../model/tag.js';

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();

    if (!tags.length) return res.status(204).json({ message: 'No tags found' });

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const createTag = async (req, res) => {
  try {
    var { name } = req.body;

    if (!name) return res.status(400).json({ message: 'name are required' });

    const newTag = new Tag({
      name,
    });

    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    var { name } = req.body;

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(updatedTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTag = await Tag.findByIdAndDelete(id);

    if (!deletedTag) return res.status(404).json({ message: 'Tag not found' });

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
