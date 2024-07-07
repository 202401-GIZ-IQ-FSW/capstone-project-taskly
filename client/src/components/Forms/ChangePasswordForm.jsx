import { useState } from 'react';
import Button from '../Button/Button';

const ChangePasswordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic if needed
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Current Password */}
      <div className="my-8">
        <label
          htmlFor="currentPassword"
          className="text-start block text-sm font-medium text-gray-900 mb-1">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
        />
      </div>

      {/* New Password */}
      <div className="my-8">
        <label
          htmlFor="newPassword"
          className="text-start block text-sm font-medium text-gray-900 mb-1">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
        />
      </div>

      {/* Confirm Password */}
      <div className="my-8">
        <label
          htmlFor="confirmPassword"
          className="text-start block text-sm font-medium text-gray-900 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50"
        />
      </div>

      {/* Submit Button */}
      <div className="my-8">
        <Button
          type="submit"
          className="w-full px-6 py-3 bg-primary-dark text-white font-semibold rounded-md hover:bg-primary-light focus:outline-none focus:ring focus:ring-primary-dark focus:ring-opacity-50">
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
