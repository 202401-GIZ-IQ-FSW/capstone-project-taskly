const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401); // Unauthorized

  const refreshToken = cookies.refreshToken;

  try {
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return res.sendStatus(403); // Forbidden
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user._id.toString() !== decoded.userInfo.id) {
          return res.sendStatus(403); // Forbidden
        }

        const userInfo = {
          id: user._id,
          role: user.role,
          username: user.username,
        };
        const accessToken = jwt.sign(
          { userInfo },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '3h' }
        );

        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { handleRefreshToken };
