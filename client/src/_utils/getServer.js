export const API_URL =
process.env.NODE_ENV === 'development' ?
    process.env.NEXT_PUBLIC_DEV_API :
    process.env.NEXT_PUBLIC_PROD_API;

/**
 * @example
 * // Example usage of the custom fetch object
 * // You would do this
 * import api from '@/Utils/getServer';
 * api('/projects/id', { method: 'GET' });
 *
 * // Instead of this
 * fetch('localhost:3000/api/v1/projects/id', { method: 'GET' });
 *
 * @description
 * This is a custom Fetch object, it loads server URL as base URL,
 * so you won't have to keep adding full URL every time. Also, to control
 * the server port whenever it changes, and adapt to server mode (dev, prod).
 *
 * @param {String} endpoint - The endpoint you want to get, post, delete, ...
 * @param {RequestInit} options - Same options you would pass with Fetch API
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch request.
 */
function api(endpoint, options = {}) {
  return fetch(`${API_URL}${endpoint}`, options);
}

export default api;
