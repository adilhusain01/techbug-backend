import Card from '../model/card.js';

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find();

    if (!cards.length) res.status(204).json({ message: 'No cards found' });

    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const addCard = async (req, res) => {
  try {
    const { title, image_uri, description } = req.body;

    if (!title || !image_uri || !description) {
      res
        .status(400)
        .json({ message: 'Title, Image_uri and Description are required' });
    }

    const newCard = new Card({
      title,
      image_uri,
      description,
    });

    const savedCard = await newCard.save();
    res.status(200).json(savedCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image_uri, description } = req.body;

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { title, image_uri, description },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json(updatedCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(204).json(); // No content to send back for successful deletion
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
