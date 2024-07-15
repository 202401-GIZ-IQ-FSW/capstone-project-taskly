import { useState } from 'react';
import fetcher from '@/_utils/fetcher';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../Button/Button';

const ChangePasswordForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await fetcher('/v1/user/profile/change-password', {
        method: 'PUT',
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (response.message) {
        setSuccess(response.message);
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setError('');
        // Close the side nav after 1.5 seconds
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Old Password */}
      <div className="my-8 relative">
        <label
          htmlFor="oldPassword"
          className="text-start block text-sm font-medium text-gray-900 mb-1">
          Current Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="oldPassword"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring focus:ring-light-blue focus:ring-opacity-50"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
          onClick={() => setShowPassword(!showPassword)}>
          <div className="mt-5">{showPassword ? <FiEyeOff /> : <FiEye />}</div>
        </button>
      </div>

      {/* New Password */}
      <div className="my-8 relative">
        <label
          htmlFor="newPassword"
          className="text-start block text-sm font-medium text-gray-900 mb-1">
          New Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring focus:ring-light-blue focus:ring-opacity-50"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
          onClick={() => setShowPassword(!showPassword)}>
          <div className="mt-5">{showPassword ? <FiEyeOff /> : <FiEye />}</div>
        </button>
      </div>

      {/* Confirm Password */}
      <div className="my-8 relative">
        <label
          htmlFor="confirmPassword"
          className="text-start block text-sm font-medium text-gray-900 mb-1">
          Confirm New Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          required
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-blue focus:ring focus:ring-light-blue focus:ring-opacity-50"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
          onClick={() => setShowPassword(!showPassword)}>
          <div className="mt-5">{showPassword ? <FiEyeOff /> : <FiEye />}</div>
        </button>
      </div>

      {/* Submit Button */}
      <div className="my-8">
        <Button type="submit" className="w-full px-6 py-3">
          Change Password
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </form>
  );
};

export default ChangePasswordForm;
