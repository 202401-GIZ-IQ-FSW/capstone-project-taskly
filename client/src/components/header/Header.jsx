"use client";
import React, { useState } from "react";
import Link from "next/link";
import SearchTickets from "../searchTicket/SearchTickets";

const Header = ({ links, signInText }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div>Tickets</div>
      <nav>
        {links.map((link, index) => (
          <Link key={index} href={link.url} legacyBehavior>
            <a className="mr-4 text-gray-700 hover:text-gray-900">
              {link.text}
            </a>
          </Link>
        ))}
        <button onClick={openModal}>Search tickets</button>
      </nav>
      <button className="bg-gray-500 text-white px-4 py-2 rounded">
        {signInText}
      </button>
      {isModalOpen && <SearchTickets onClose={closeModal} />}
    </header>
  );
};

export default Header;
