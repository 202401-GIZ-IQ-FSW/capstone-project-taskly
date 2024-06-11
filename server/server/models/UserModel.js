const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const USER_ROLES = require('../config/userRoles');
const { passwordValidation } = require('../util/passwordValidation');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      validate: {
        validator: passwordValidation,
        message:
          'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a special character.',
      },
    },
    profilePicture: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: USER_ROLES.User,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users without a Google ID
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Method to compare entered password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
