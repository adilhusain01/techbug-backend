import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email & password are required' });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: 'Incorrect password' });

  const roles = Object.values(foundUser.roles).filter(Boolean);

  const accessToken = jwt.sign(
    {
      userInfo: {
        email: foundUser.email,
        userId: foundUser._id,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '600s' }
  );

  const refreshToken = jwt.sign(
    {
      email: email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '21600s' }
  );

  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 21600 * 1000,
  });

  res.json({ accessToken });
};

export const handleLogout = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.sendStatus(204);

  const refreshToken = cookie.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = '';
  const result = await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true });
  res.sendStatus(204);
};
