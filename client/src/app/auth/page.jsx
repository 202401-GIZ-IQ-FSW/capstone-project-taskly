// client\src\app\auth\page.jsx
// this file saves the tokens to localstorage and redirects to homPage
'use client';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
export default function RedirectToHom() {
  const { handleSetAccessToken, handleSetRefreshToken } = useUser();

  useEffect(() => {
    const handleTokens = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        if (accessToken && refreshToken) {
          handleSetAccessToken(accessToken);
          handleSetRefreshToken(refreshToken);
          window.dispatchEvent(new Event('storage'));
          window.location.href = '/';
        } else {
          console.log('Error: Tokens Missing');
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleTokens();
  }, []);
  return <></>;
}
