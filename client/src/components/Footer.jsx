import React from 'react';

const Footer = ({ companyName, footerText, links }) => (
  <footer>
    <p>{companyName}</p>
    <p>{footerText}</p>
    <nav>
      {links.map((link, index) => (
        <a href={link.url} key={index}>{link.text}</a>
      ))}
    </nav>
  </footer>
);

export default Footer;
