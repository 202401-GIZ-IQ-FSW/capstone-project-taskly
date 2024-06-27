'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Navigation/Footer/Footer';
import Navbar from '@/components/Navigation/Navbar/Navbar';

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname();
  const [showNavAndFooter, setShowNavAndFooter] = useState(true);

  useEffect(() => {
    const isAuthRoute = pathname.includes('auth')|| pathname.includes('sign');
    const isAccountRoute = pathname.includes('account');
    setShowNavAndFooter(!(isAccountRoute || isAuthRoute));
  }, [pathname]);

  return (
    <>
      {showNavAndFooter && <Navbar />}
      {children}
      {showNavAndFooter && <Footer />}
    </>
  );
};

export default ConditionalLayout;
