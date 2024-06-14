"use client";
import React, { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { headerLinks, footerLinks } from "@/data/Links";
export default function page() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "http://localhost:3000/";
    } else {
      // handle error
      alert(JSON.stringify(data.message));
    }
  };
  return (
    <>
      <Header links={headerLinks} signInText="Sign In" />
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto bg-white border p-6 rounded w-1/3"
        >
          <div className="mb-3">
            <label>Username</label>
            <div className="">
              <input
                type="text"
                className="border"
                id="username"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>firstName</label>
            <div className="">
              <input
                type="text"
                className="border"
                id="firstName"
                placeholder="firstName"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>lastName</label>
            <div className="">
              <input
                type="text"
                className="border"
                id="lastName"
                placeholder="lastName"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>email</label>
            <div className="">
              <input
                type="text"
                className="border"
                id="email"
                placeholder="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <div className="">
              <input
                type="password"
                className="border"
                id="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded mx-4 w-100 border"
          >
            Register
          </button>
        </form>
      </div>
      <Footer
        companyName="TicketMaster"
        footerText="Your ultimate ticket support solution!"
        links={footerLinks}
      />
    </>
  );
}
