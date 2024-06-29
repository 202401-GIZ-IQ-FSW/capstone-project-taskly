const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokens = (userInfo) => {
  const accessToken = jwt.sign({ userInfo }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10s',
  });
  const refreshToken = jwt.sign(
    { userInfo },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
  return { accessToken, refreshToken };
};

module.exports = { generateTokens };
