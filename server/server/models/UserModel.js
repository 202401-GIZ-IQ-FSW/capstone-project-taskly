const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const USER_ROLES = require('../config/userRoles');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
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
      required: true,
    },
    profile_picture: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: USER_ROLES.User,
    },
    refresh_token: {
      type: String,
      default: null,
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

// Create the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
