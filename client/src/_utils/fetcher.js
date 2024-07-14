import api from './getServer';

const fetcher = async (url, options = {}) => {
  const accessToken =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('accessToken')
      : null;
  const refreshToken =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('refreshToken')
      : null;

  const authHeader = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : refreshToken
    ? { Authorization: `Bearer ${refreshToken}` }
    : {};

  // Don't attempt to fetch the user profile if they aren't logged in (no token)
  if (
    url &&
    (url.includes('/account') ||
      url.includes('/profile') ||
      url.includes('/projects')) &&
    !accessToken
  ) {
    return null;
  }

  // Check if FormData is used
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...authHeader,
    ...options.headers,
  };

  // Set Content-Type based on FormData or JSON
  if (isFormData) {
    delete headers['Content-Type']; // Let browser set Content-Type for FormData
  } else {
    headers['Content-Type'] = 'application/json';
  }

  const mergedOptions = {
    ...options,
    headers,
    method: options.method || 'GET',
  };

  const response = await api(url, mergedOptions);

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(` ${errorMessage.message || response.statusText}`); //Error fetching data from ${API_URL}${url}: ${response.status} -
  }

  return await response.json();
};

export default fetcher;
