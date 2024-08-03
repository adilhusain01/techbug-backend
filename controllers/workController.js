import Work from '../model/work.js';

export const getWorks = async (req, res) => {
  try {
    const works = await Work.find();

    if (!works.length)
      return res.status(204).json({ message: 'No works found' });

    res.json(works);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const getWorkByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    const works = await Work.find({ tag });

    if (!works.length)
      return res.status(204).json({ message: 'No works found with this tag' });

    res.json(works);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createWork = async (req, res) => {
  try {
    const { title, image_uri, description, tag } = req.body;

    if (!title || !image_uri || !description || !tag)
      return res.status(400).json({
        message: 'title, image_uri, description, and tag are required',
      });

    const newWork = new Work({
      title,
      image_uri,
      description,
      tag,
    });

    const savedWork = await newWork.save();
    res.status(201).json(savedWork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image_uri, description, tag } = req.body;

    const updatedWork = await Work.findByIdAndUpdate(
      id,
      { title, image_uri, description, tag },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedWork) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json(updatedWork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWork = await Work.findByIdAndDelete(id);

    if (!deletedWork)
      return res.status(404).json({ message: 'Work not found' });

    res.status(204).json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
