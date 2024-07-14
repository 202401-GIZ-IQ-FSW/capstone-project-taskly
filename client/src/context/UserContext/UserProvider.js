'use client';
import { useEffect, useState, useCallback } from 'react';
import fetcher from '@/_utils/fetcher';
import { UserContext } from './UserContext';
import useRefreshToken from '@/hooks/useTokenRefresh';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const loadTokensFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const storedAccessToken = window.localStorage.getItem('accessToken');
        const storedRefreshToken = window.localStorage.getItem('refreshToken');
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
        window.localStorage.setItem('accessToken', token);
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
        window.localStorage.setItem('refreshToken', token);
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
        const userAccount = await fetcher('/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      const response = await fetch('http://localhost:3001/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
        setUser(null);
        setLoggedIn(false);
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    }
  };

  useRefreshToken(refreshToken, handleSetAccessToken, handleSetRefreshToken);

  const handleSetUser = useCallback((updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  }, []);

  const value = {
    loggedIn,
    user,
    handleSetUser,
    accessToken,
    handleSetAccessToken,
    handleSetRefreshToken,
    handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
