import React, { useState } from 'react';
import Button from '../Button/Button';
import fetcher from '@/_utils/fetcher';
import { useUser } from '@/hooks/useUser';

const EditProfileForm = ({ user, onClose }) => {
  const { handleSetUser } = useUser();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    profilePhoto: user?.profilePhoto || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetcher('/v1/user/profile', {
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      setSuccess('Profile updated successfully!');
      handleSetUser(res?.updatedUser);
      // Close the side nav after 1 second
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(`Failed to update profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePhoto: file,
      }));
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring focus:ring-light-blue focus:ring-opacity-50"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring focus:ring-light-blue focus:ring-opacity-50"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring focus:ring-light-blue focus:ring-opacity-50"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring focus:ring-light-blue focus:ring-opacity-50"
          />
        </div>

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
          {formData.profilePhoto &&
            typeof formData.profilePhoto !== 'string' && (
              <p className="text-sm text-gray-500 text-start">
                {formData.profilePhoto.name}
              </p>
            )}
          <label
            htmlFor="profilePhoto"
            className="flex items-center gap-2 cursor-pointer text-light-blue hover:text-darker-green">
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
            className="w-full px-6 py-3 bg-light-blue text-white font-semibold rounded-md hover:bg-custom-blue focus:outline-none focus:ring focus:ring-custom-blue focus:ring-opacity-50"
            disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Success and Error Messages */}
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default EditProfileForm;
