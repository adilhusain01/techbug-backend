import Contact from '../model/contact.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts.length)
      return res.status(204).json({ message: 'No contacts found' });

    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const { company } = req.body;

    if (!name || !email || !phone || !message)
      return res
        .status(204)
        .json({ message: 'name, email, phone and message are required' });

    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact)
      return res.status(404).json({ message: 'Contact not found' });

    res.status(204).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
