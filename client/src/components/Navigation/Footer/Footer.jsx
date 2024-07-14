import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const footerLinks = [
    { name: 'Submit a Ticket', href: '/submit-ticket' },
    { name: 'Track Ticket', href: '/track-ticket' },
    { name: 'Receive', href: '/receive' },
    { name: 'Troubleshooting', href: '/troubleshooting' },
    { name: 'Contact Support', href: '/contact-support' },
  ];

  return (
    <footer className="bg-custom-teal text-white">
      <div className="container mx-auto px-6 py-10 sm:pt-20 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-10">
          <div className="text-center sm:text-left mb-6 sm:mb-0 sm:w-1/4">
            <h1 className="text-3xl font-bold font-roboto mb-2">Taskly</h1>
            <p className="text-sm font-roboto">Your ultimate ticket support solution!</p>
          </div>
          <div className="flex flex-col mb-6 sm:mb-0 sm:w-1/4">
            <h2 className="text-xl font-bold mb-2 font-roboto">Quick Links</h2>
            <div className="w-12 border-b-2 border-white mb-4"></div>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs leading-6 font-roboto transition-transform transform hover:translate-x-2">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col mb-6 sm:mb-0 sm:w-1/4">
            <h2 className="text-xl font-bold mb-2 font-roboto">Contact info</h2>
            <div className="w-12 border-b-2 border-white mb-4"></div>
            <p className="text-xs mb-2 font-roboto">245 2nd St, Oakland, CA 94607</p>
            <p className="text-xs mb-2 font-roboto">+964 771 856 9787</p>
            <p className="text-xs font-roboto">info@taskly.com</p>
          </div>
          <div className="flex flex-col sm:w-1/4">
            <h2 className="text-xl font-bold mb-2 font-roboto">Connect</h2>
            <div className="w-12 border-b-2 border-white mb-4"></div>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-xl hover:text-gray-300 transition-transform transform hover:translate-x-1" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl hover:text-gray-300 transition-transform transform hover:translate-x-1" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-xl hover:text-gray-300 transition-transform transform hover:translate-x-1" />
              </a>
              <a href="mailto:info@taskly.com">
                <FaEnvelope className="text-xl hover:text-gray-300 transition-transform transform hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs leading-5 tracking-widest font-roboto">Copyright &copy; 2024 Taskly, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
