import { footerLinks } from '@/data/Links';
import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="flex flex-col md:flex-row justify-between p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
    <div className="mb-4 md:mb-0">
      <p className="text-lg font-semibold">TicketMaster</p>
      <p>Your ultimate ticket support solution!</p>
      <p className="mt-2">&copy; {new Date().getFullYear()} TicketMaster</p>
    </div>

    <nav className="flex flex-col md:flex-row md:space-x-4">
      {footerLinks.map((link, index) => (
        <Link
          href={link.url}
          key={index}
          className="hover:text-gray-200"
        >
          {link.text}
        </Link>
      ))}
    </nav>
  </footer>
);

export default Footer;
