import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { headerLinks, footerLinks } from "@/data/Links";
export default function page() {
  return (
    <>
      <Header links={headerLinks} signInText="Sign In" />
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Create a New Ticket</h1>
        <div className="flex flex-row mt-5 gap-4">
        <Link href="/projects/new">
        <button className="border border-black px-6 py-2">Project</button>
          
        </Link>
        <Link href="/tickets/new">
        <button className="border border-black px-6 py-2">Ticket</button>
        </Link>
      </div>
       
      </div>
      <Footer
        companyName="TicketMaster"
        footerText="Your ultimate ticket support solution!"
        links={footerLinks}
      />
    </>
  );
}
