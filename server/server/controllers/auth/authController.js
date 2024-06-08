const UserModel = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleRegistration = async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;
  try {
    // Check if user with the same username or email already exists
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new UserModel({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();
    // Return the registered user details excluding the password
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        username: newUser.username,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        profile_picture: newUser.profile_picture,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const checkUser = await UserModel.findOne({ email });

    if (!checkUser) {
      return res.status(401).json({ message: 'Authentication failed! User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed! Wrong password.' });
    }

    // If password matches, create a JWT token
    const token = jwt.sign({ id: checkUser._id, email: checkUser.email }, process.env.JWT_SECRET, { expiresIn: '72h' });

    // Return the token and user info (excluding password)
    return res.status(200).json({ message: 'Login successful', token, user: { id: checkUser._id, email: checkUser.email, username: checkUser.username } });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred during login', error });
  }
};

const handleLogout = async (req, res) => {
  try {
    // If you're using sessions:
    // req.session.destroy((err) => {
    //   if (err) {
    //     return res.status(500).json({ message: 'An error occurred during logout', error: err });
    //   }
    //   res.status(200).json({ message: 'Logout successful' });
    // });

    // If you're using JWTs:
    // Simply instruct the client to discard the token
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred during logout', error });
  }
};

module.exports = { handleRegistration, handleLogin, handleLogout };
