const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401); // Unauthorized

  const refreshToken = cookies.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await UserModel.findById(decoded.userInfo.id);

    if (!user || user.refreshToken !== refreshToken) return res.sendStatus(403); // Forbidden
    const userInfo = { id: user._id, role: user.role, username: user.username };
    const accessToken = jwt.sign(
      {
        userInfo,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(403); // Forbidden
  }
};

module.exports = { handleRefreshToken };
