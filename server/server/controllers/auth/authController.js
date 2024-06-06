const UserModel = require('../../models/UserModel');

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

const handleLogin = async (req, res) => {};

const handleLogout = async (req, res) => {};

module.exports = { handleRegistration, handleLogin, handleLogout };
