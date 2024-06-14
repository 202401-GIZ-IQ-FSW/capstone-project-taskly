"use client";
import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { headerLinks, footerLinks } from "@/data/Links";
export default function page() {
  const handleCreate = async () => {
    const response = await fetch("http://localhost:3001/api/v1/auth/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "http://localhost:3000/";
    } else {
      console.error("Logout failed");
    }
  };
  return (
    <>
      <Header links={headerLinks} signInText="Sign In" />
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Create a new Project</h1>
        <form
          onSubmit={handleCreate}
          className="mx-auto bg-white border  p-6 rounded w-1/3"
        >
          <div className="mb-3">
            <label >Name</label>
            <div>
              <input
                type="text"
                id="name"
                placeholder="Project Name"
                name="name"
                className="border"
              />
            </div>
          </div>
          <div className="mb-3">
            <label >Description</label>
            <div>
              <input
                type="text"
                id="description"
                className="border"
                placeholder="Project Description"
                name="description"
              />
            </div>
          </div>

          <button
            type="submit" onClick={handleCreate}
            className="bg-gray-500 text-white px-4 py-2 rounded mx-4 w-100 border"
          >
            Create
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
