import NewsLetter from '../model/newsLetter.js';

export const getNewsLetter = async (req, res) => {
  try {
    const newsLetters = await NewsLetter.find();

    if (!newsLetters.length)
      return res.status(204).json({ message: 'No NewsLetter found' });

    res.json(newsLetters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const createNewsLetter = async (req, res) => {
  try {
    const { email, topics } = req.body;

    if (!email || !topics)
      return res.status(400).json({ message: 'email and topics are required' });

    const newNewsLetter = new NewsLetter({
      email,
      topics,
    });

    const savedNewsLetter = await newNewsLetter.save();
    res.status(201).json(savedNewsLetter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateNewsLetter = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, topics } = req.body;

    const updatedNewsLetter = await NewsLetter.findByIdAndUpdate(
      id,
      { email, topics },
      { new: true, runValidators: true }
    );

    if (!updatedNewsLetter) {
      return res.status(404).json({ message: 'NewsLetter not found' });
    }

    res.json(updatedNewsLetter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteNewsLetter = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNewsLetter = await NewsLetter.findByIdAndDelete(id);

    if (!deletedNewsLetter)
      return res.status(404).json({ message: 'NewsLetter not found' });

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
