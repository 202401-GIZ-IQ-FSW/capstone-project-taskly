import React from 'react';
import Link from 'next/link';
export default function CreateItems() {
  return (
    <>
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Create a New Ticket</h1>
        <div className="flex flex-row mt-5 gap-4">
          <Link href="/projects/new">
            <button className="border border-black px-6 py-2">
              New Project
            </button>
          </Link>
          <Link href="/tickets/new">
            <button className="border border-black px-6 py-2">
              New Ticket
            </button>
          </Link>
        </div>
        <div className="flex flex-row mt-5 gap-4">
          <Link href="/projects/all">
            <button className="border border-black px-6 py-2">
              View All Projects
            </button>
          </Link>
          <Link href="/tickets/all">
            <button className="border border-black px-6 py-2" disabled>
              View All Ticket
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
