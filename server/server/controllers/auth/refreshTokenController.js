const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const { generateTokens } = require('../../util/generateTokens');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401); // Unauthorized
  }

  const refreshToken = authHeader.split(' ')[1];

  try {
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return res.sendStatus(403); // Forbidden
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || user._id.toString() !== decoded.userInfo.id) {
          return res.sendStatus(403); // Forbidden
        }

        const userInfo = {
          id: user._id,
          role: user.role,
          username: user.username,
        };
        const { accessToken, refreshToken: newRefreshToken } =
          generateTokens(userInfo);

        // Update user's refresh token in the database
        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({ accessToken, refreshToken: newRefreshToken });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { handleRefreshToken };
