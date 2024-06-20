'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Navigation/Footer/Footer';
import Navbar from '@/components/Navigation/Navbar/Navbar';

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname();
  const [showNavAndFooter, setShowNavAndFooter] = useState(true);

  useEffect(() => {
    setShowNavAndFooter(!pathname.includes('auth'));
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
