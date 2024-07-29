import Contact from '../model/contact.js';

export const makeContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const { company } = req.body;

    if (!name || !email || !phone || !message)
      res
        .status(204)
        .json({ message: 'Name, Email, Phone and Message are required' });

    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      message,
    });

    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    console.log(error);
  }
};
