"use client";
import React, { useState } from "react";
import Link from "next/link";
import SearchTickets from "../searchTicket/SearchTickets";

const Header = ({ links, authentication }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-white">TicketMaster</div>
      <nav className="flex items-center space-x-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="text-white hover:text-gray-200"
          >
            {link.text}
          </Link>
        ))}
        <button 
          onClick={openModal} 
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
        >
          Search tickets
        </button>
      </nav>

      <div className="flex space-x-4">
        {authentication.map((authLink, index) => (
          <Link key={index} href={authLink.url}>
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400">
              {authLink.text}
            </button>
          </Link>
        ))}
      </div>

      {isModalOpen && <SearchTickets onClose={closeModal} />}
    </header>
  );
};

export default Header;
