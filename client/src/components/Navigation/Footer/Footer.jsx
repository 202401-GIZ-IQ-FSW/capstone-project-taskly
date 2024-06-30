import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const footerLinks = [
    { name: 'Submit a Ticket', href: '/submit-ticket' },
    { name: 'Track Ticket', href: '/track-ticket' },
    { name: 'Receive', href: '/receive' },
    { name: 'Troubleshooting', href: '/troubleshooting' },
    { name: 'Contact Support', href: '/contact-support' },
  ];

  return (
    <footer className="bg-slate-100">
      <div className="overflow-hidden px-6 py-10 sm:pt-20 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Taskly</h1>
            <p className="text-sm text-gray-600">
              Your ultimate ticket support solution!
            </p>
          </div>
          <nav className="flex flex-col sm:flex-row sm:space-x-12">
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-gray-900 mb-4 sm:mb-0">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <hr className="border-gray-200" />
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2024 Taskly, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
