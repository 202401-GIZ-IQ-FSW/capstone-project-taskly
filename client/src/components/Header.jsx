'use client';

import Link from 'next/link';
import React from 'react';

const Header = ({ links, signInText }) => (
  <header>
    <div className="logo">Tickets</div>
    <nav>
      {links.map((link, index) => (
        <Link key={index} href={link.url} legacyBehavior>
          <a>{link.text}</a>
        </Link>
      ))}
    </nav>
    <button>{signInText}</button>
  </header>
);

export default Header;
