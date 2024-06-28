import { useEffect, useCallback } from 'react';

const useTokenRefresh = (handleSetAccessToken) => {
  const refreshInterval = parseInt(
    process.env.NEXT_PUBLIC_JWT_REFRESH_INTERVAL,
    10
  );

  const refreshTokens = useCallback(async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/auth/refresh-token',
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to refresh access token');
      }

      const data = await response.json();

      if (data.accessToken) {
        handleSetAccessToken(data.accessToken);
        console.log('Token was refreshed');
      } else {
        console.error('Failed to refresh access token');
      }
    } catch (error) {
      console.error('Error refreshing tokens:', error.message);
    }
  }, [handleSetAccessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokens();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return refreshTokens;
};

export default useTokenRefresh;
