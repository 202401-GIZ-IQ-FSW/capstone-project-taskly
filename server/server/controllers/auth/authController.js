// server\server\controllers\auth\authController.js
const UserModel = require('../../models/UserModel');
const jwt = require('jsonwebtoken');
const { upload } = require('../../config/multer');

const handleRegistration = async (req, res) => {
  try {
    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
      const { username, firstName, lastName, email, password } = req.body;
      const profilePicturePath = req.file
        ? `uploads/${username}/${req.file.filename}`
        : 'uploads/default/avatar.jpg';
      // Check if user with the same username or email already exists
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const newUser = new UserModel({
        username,
        firstName,
        lastName,
        email,
        password,
        profilePicture: profilePicturePath,
      });
      try {
        await newUser.save();
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      const userInfo = {
        id: newUser._id,
        role: newUser.role,
        username: newUser.username,
      };
      const accessToken = jwt.sign(
        { userInfo },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        { userInfo },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      // Store refresh token in the database
      newUser.refreshToken = refreshToken;
      // Save the user to the database
      await newUser.save();

      // Set refresh token in cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // one day
      });

      // Return the registered user details
      res.status(201).json({
        message: 'User registered successfully',
        accessToken,
        refreshToken,
        user: {
          _id: newUser._id,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, username, password } = req.body;

  // Basic validation
  if ((!email || !username) && !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email or username and password' });
  }
  try {
    // Find the user by email or username
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Authentication failed! User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.isCorrectPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Authentication failed! Wrong password.' });
    }

    // If password matches, create JWT tokens
    const userInfo = { id: user._id, role: user.role, username: user.username };
    const accessToken = jwt.sign(
      { userInfo },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { userInfo },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Store refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    // Return the access token and user info
    const {
      password: _password,
      refreshToken: _refreshToken,
      ...userData
    } = user._doc;

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: userData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); // No content
  const refreshToken = cookies.refreshToken;
  try {
    // Find the user by refresh token
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete the refresh token from the database
    user.refreshToken = null;
    await user.save();

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred during logout',
      error: error.message,
    });
  }
};

const handleGoogleCallback = async (req, res) => {
  try {
    const user = req.user;
    res.redirect(
      `http://localhost:3000/auth?accessToken=${user.accessToken}&refreshToken=${user.refreshToken}`
    );
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred during logout',
      error: error.message,
    });
  }
};

module.exports = {
  handleRegistration,
  handleLogin,
  handleLogout,
  handleGoogleCallback,
};
