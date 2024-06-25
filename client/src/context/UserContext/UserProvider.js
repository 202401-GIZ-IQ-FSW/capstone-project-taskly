'use client';
import { useEffect, useState, useCallback } from 'react';
import fetcher from '@/_utils/fetcher';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const loadTokensFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const storedAccessToken = window.localStorage.getItem('access_token');
        const storedRefreshToken = window.localStorage.getItem('refresh_token');

        if (storedAccessToken) setAccessToken(storedAccessToken);
        if (storedRefreshToken) setRefreshToken(storedRefreshToken);
      } catch (error) {
        console.error('Error loading tokens from storage:', error);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadTokensFromStorage();

      const handleStorageChange = () => {
        loadTokensFromStorage();
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  const handleSetAccessToken = useCallback((token) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('access_token', token);
        setAccessToken(token);
        console.log('Access token set:', token);
      } catch (error) {
        console.error('Error setting access token:', error);
      }
    }
  }, []);

  const handleSetRefreshToken = useCallback((token) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('refresh_token', token);
        setRefreshToken(token);
        console.log('Refresh token set:', token);
      } catch (error) {
        console.error('Error setting refresh token:', error);
      }
    }
  }, []);

  const fetchUserProfile = async () => {
    if (accessToken) {
      try {
        const userAccount = await fetcher('/v1/user/profile');

        if (userAccount) {
          setUser(userAccount);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserProfile();
    }
  }, [accessToken]);

  // Refresh token logic
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const handleRefreshToken = async () => {
  //       if (!refreshToken) return;

  //       try {
  //         const res = await fetcher('/v1/token-refresh', {
  //           method: 'POST',
  //           headers: { Authorization: `Bearer ${refreshToken}` },
  //         });
  //         if (res) {
  //           handleSetAccessToken(res.access_token);
  //           handleSetRefreshToken(res.refresh_token);
  //           console.log('Token refreshed');
  //         } else {
  //           console.error('Failed to refresh token');
  //         }
  //       } catch (error) {
  //         console.error('Error while refreshing token:', error);
  //       }
  //     };

  //     const refreshInterval = parseInt(process.env.NEXT_PUBLIC_JWT_REFRESH_INTERVAL, 10);
  //     const tokenRefreshInterval = setInterval(handleRefreshToken, refreshInterval);

  //     return () => clearInterval(tokenRefreshInterval);
  //   }
  // }, [refreshToken, handleSetAccessToken, handleSetRefreshToken]);

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      const response = await fetcher('/v1/auth/logout', {
        method: 'POST',
      });

      if (response.message) {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('refresh_token');
        setUser(null);
        setLoggedIn(false);
        console.log(response.message)
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    }
  };

  const value = {
    loggedIn,
    user,
    accessToken,
    handleSetAccessToken,
    refreshToken,
    handleSetRefreshToken,
    handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
