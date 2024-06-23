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
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div>Tickets</div>
      <nav>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="mr-4 text-gray-700 hover:text-gray-900"
          >
            {link.text}
          </Link>
        ))}
        <button onClick={openModal}>Search tickets</button>
      </nav>

      {authentication.map((authLink, index) => (
        <Link key={index} href={authLink.url}>
          <button className="bg-gray-400 text-white px-4 py-2 rounded">
            {authLink.text}
          </button>
        </Link>
      ))}

      {isModalOpen && <SearchTickets onClose={closeModal} />}
    </header>
  );
};

export default Header;

