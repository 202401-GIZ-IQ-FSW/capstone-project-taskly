import api from './getServer';

const fetcher = async (url, options = {}) => {
  const accessToken = typeof window !== 'undefined' ? window.sessionStorage.getItem('access_token') : null;
  const authHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  // don't attempt the fetch the user profile if they aren't logged in (no token)
  if (url && url.includes('/user/profile') && !accessToken) {
    return null;
  }

  const headers = {
    'Content-Type': 'application/json',
    ...authHeader,
    ...options.headers,
  };

  const mergedOptions = {
    ...options,
    headers,
    method: options.method || 'GET',
  };

  const response = await api(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`Error fetching data from ${API_URL}${url}: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
};

export default fetcher;
