import User from '../model/user';
import { jsonwebtoken as jwt } from 'jsonwebtoken';

export const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) {
      return res.sendStatus(403);
    }

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { email: decoded.email, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '21600s' }
    );

    res.json({ accessToken });
  });
};
