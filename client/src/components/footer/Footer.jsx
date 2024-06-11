import Link from "next/link";
import React from "react";

const Footer = ({ companyName, footerText, links }) => (
  <footer className="flex flex-row justify-between p-6 text-center bg-[#f8f9fa]">
    <div className="flex flex-col justify-between">
      <div>
        <p>{companyName}</p>
        <p>{footerText}</p>
      </div>

      <div>
        {companyName} {/** copyright icon */}
      </div>
    </div>

    <nav className="flex flex-col text-right">
      {links.map((link, index) => (
        <Link href={link.url} key={index}>
          {link.text}
        </Link>
      ))}
    </nav>
  </footer>
);

export default Footer;
