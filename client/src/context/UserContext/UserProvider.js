'use client';
import { useEffect, useState, useCallback } from 'react';
import fetcher from '@/_utils/fetcher';
import { UserContext } from './UserContext';
import useTokenRefresh from '@/hooks/useTokenRefresh';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const loadTokensFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const storedAccessToken = window.localStorage.getItem('access_token');
        if (storedAccessToken) setAccessToken(storedAccessToken);
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

  // fetcher is not working properly with logout so using normal fetch for now
  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      const response = await fetch('http://localhost:3001/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('refresh_token');
        setUser(null);
        setLoggedIn(false);
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    }
  };

  useTokenRefresh(handleSetAccessToken);

  const value = {
    loggedIn,
    user,
    accessToken,
    handleSetAccessToken,
    handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
