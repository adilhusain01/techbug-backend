import News from '../model/news.js';

export const getNews = async (req, res) => {
  try {
    const news = await News.find();

    if (!news.length) return res.status(204).json({ message: 'No news found' });

    res.json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, image_uri } = req.body;

    if (!title || !image_uri)
      return res
        .status(400)
        .json({ message: 'title and image_uri are required' });

    const newNews = new News({
      title,
      image_uri,
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image_uri } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, image_uri },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(updatedNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews)
      return res.status(404).json({ message: 'News not found' });

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
