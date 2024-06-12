const mongoose = require('mongoose');

/**
 * Middleware to validate MongoDB ObjectId parameters in the request.
 *
 * @param {string} paramName - The name of the parameter in the request URL to validate.
 * @returns {function} Middleware function to validate the ObjectId.
 */
const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Invalid ${paramName}` });
    }

    // If valid, proceed to the next middleware or route handler
    next();
  };
};

module.exports = {
  validateObjectId,
};
