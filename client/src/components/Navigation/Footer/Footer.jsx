import { footerLinks } from '@/data/Links';
import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="flex flex-row justify-between p-6 text-center bg-[#f8f9fa]">
    <div className="flex flex-col justify-between">
      <div>
        <p>TicketMaster</p>
        <p>Your ultimate ticket support solution!</p>
      </div>

      <div>TicketMaster {/** copyright icon */}</div>
    </div>

    <nav className="flex flex-col text-right">
      {footerLinks.map((link, index) => (
        <Link
          href={link.url}
          key={index}>
          {link.text}
        </Link>
      ))}
    </nav>
  </footer>
);

export default Footer;
