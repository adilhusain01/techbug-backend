import User from '../model/user.js';
import bcrypt from 'bcrypt';

export const getUsersMeta = async (req, res) => {
  try {
    const users = await User.find(
      {},
      'first_name last_name username email roles createdAt'
    );

    if (!users.length)
      return res.status(204).json({ message: 'No users found' });

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(204).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      phone,
      password,
      roles,
      refreshToken,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !username ||
      !email ||
      !phone ||
      !password ||
      !roles
    )
      return res.status(400).json({ message: 'All fields are required' });

    const emailExists = await User.findOne({ email }).exec();
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const usernameExists = await User.findOne({ username }).exec();
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const phoneExists = await User.findOne({ phone }).exec();
    if (phoneExists) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let selectedRole;
    if (roles === 'Admin')
      selectedRole = { Admin: 101520, Manager: 152025, Editor: 202530 };
    else if (roles === 'Manager')
      selectedRole = { Manager: 152025, Editor: 202530 };
    else selectedRole = { Editor: 202530 };

    const newUser = new User({
      first_name,
      last_name,
      username,
      email,
      phone,
      password: hashedPassword,
      roles: selectedRole,
      refreshToken,
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
    let {
      first_name,
      last_name,
      username,
      email,
      phone,
      password,
      roles,
      refreshToken,
    } = req.body;

    if (password?.length) password = await bcrypt.hash(password, 10);

    if (roles) {
      if (roles === 'Admin')
        roles = { Admin: 101520, Manager: 152025, Editor: 202530 };
      else if (roles === 'Manager') roles = { Manager: 152025, Editor: 202530 };
      else roles = { Editor: 202530 };
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        username,
        email,
        phone,
        password,
        roles,
        refreshToken,
      },
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
