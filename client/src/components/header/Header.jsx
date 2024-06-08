'use client';

import Link from 'next/link';
import React from 'react';

const Header = ({ links, signInText }) => (
  <header className='flex justify-between px-12 py-5 bg-[#f8f9fa]'>
    <div>Tickets</div>
    <nav>
      {links.map((link, index) => (
        <Link key={index} href={link.url} legacyBehavior>
          <a className='mx-3'>{link.text}</a>
        </Link>
      ))}
    </nav>
    <button>{signInText}</button>
  </header>
);

export default Header;
