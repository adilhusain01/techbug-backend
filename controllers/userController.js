import User from '../model/user.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users.length)
      return res.status(204).json({ message: 'No users found' });

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, username, email, phone, password, roles } =
      req.body;

    if (!first_name || !last_name || !username || !email || !phone || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const newUser = new User({
      first_name,
      last_name,
      username,
      email,
      phone,
      password,
      roles,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, username, email, phone, password, roles } =
      req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { first_name, last_name, username, email, phone, password, roles },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: 'User not found' });

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
