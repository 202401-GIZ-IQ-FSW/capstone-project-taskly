import { useEffect, useCallback, useState } from 'react';

const useRefreshToken = (
  initialRefreshToken,
  handleSetAccessToken,
  handleSetRefreshToken
) => {
  const [refreshToken, setRefreshToken] = useState(
    initialRefreshToken || window.localStorage.getItem('refreshToken')
  );

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return;

    try {
      const res = await fetch(
        'http://localhost:3001/api/v1/auth/refresh-token',
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        handleSetAccessToken(data.accessToken);
        handleSetRefreshToken(data.refreshToken);
        setRefreshToken(data.refreshToken);
        console.log('Token was refreshed');
      } else {
        console.error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error while refreshing token:', error);
    }
  }, [refreshToken, handleSetAccessToken, handleSetRefreshToken]);

  useEffect(() => {
    const refreshInterval = parseInt(
      process.env.NEXT_PUBLIC_JWT_REFRESH_INTERVAL,
      10
    );
    const tokenRefreshInterval = setInterval(
      refreshAccessToken,
      refreshInterval
    );

    return () => clearInterval(tokenRefreshInterval);
  }, [refreshAccessToken]);

  return { refreshToken, setRefreshToken };
};

export default useRefreshToken;
