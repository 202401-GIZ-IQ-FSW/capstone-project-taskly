import React, { useState } from 'react';
import Button from '../Button/Button';

const EditProfileForm = ({ user, onSubmit }) => {
  // Initialize form state with user data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    profilePhoto: user?.profilePhoto || '',
    // Add other fields as needed
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to parent component
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle profile picture change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Example logic to handle file upload (you may replace with your actual upload logic)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePhoto: reader.result, // Update profile photo URL in formData
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-3 rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="my-8">
          <label
            htmlFor="firstName"
            className="text-start block text-sm font-medium text-gray-900 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
          />
        </div>

        {/* Last Name */}
        <div className="my-8">
          <label
            htmlFor="lastName"
            className="text-start block text-sm font-medium text-gray-900 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
          />
        </div>

        {/* Username */}
        <div className="my-8">
          <label
            htmlFor="username"
            className="text-start block text-sm font-medium text-gray-900 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
          />
        </div>

        {/* Email Address */}
        <div className="my-8">
          <label
            htmlFor="email"
            className="text-start block text-sm font-medium text-gray-900 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
          />
        </div>

        {/* Password */}
        {/* <div className="my-8">
          <label
            htmlFor="password"
            className="text-start block text-sm font-medium text-gray-900 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
          />
        </div> */}

        {/* Profile Picture */}
        <div className="my-8">
          <label
            htmlFor="profilePhoto"
            className="text-start block text-sm font-medium text-gray-900 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="profilePhoto"
            className="flex items-center gap-2 cursor-pointer text-primary-dark hover:text-darker-green">
            Upload New Photo
            <svg
              className="w-4 h-4 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </label>
        </div>

        {/* Submit Button */}
        <div className="my-8">
          <Button
            type="submit"
            className="w-full px-6 py-3 bg-primary-dark text-white font-semibold rounded-md hover:bg-primary-light focus:outline-none focus:ring focus:ring-primary-dark focus:ring-opacity-50">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
