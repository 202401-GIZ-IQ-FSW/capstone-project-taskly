'use client';

import React, { useState } from "react";

const SearchTickets = ({ onClose }) => {
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search
    onClose(); // Close modal after search
  };

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto my-8 max-h-[90vh] overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4">Search Tickets</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="ticketId" className="block text-gray-700">
              Ticket ID
            </label>
            <input
              type="text"
              id="ticketId"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label htmlFor="submitter" className="block text-gray-700">
                Submitter
              </label>
              <input
                type="text"
                id="submitter"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="status" className="block text-gray-700">
                Status
              </label>
              <input
                type="text"
                id="status"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <div className="flex justify-between space-x-2">
              <div
                className={`flex-1 text-center py-2 border rounded cursor-pointer ${category === 'Technical' ? 'bg-gray-200' : ''}`}
                onClick={() => handleCategoryClick('Technical')}
              >
                <div className="flex justify-center items-center">
                  <span className="text-lg">X {/**icon */}</span>
                </div>
                <div>Technical</div>
              </div>
              <div
                className={`flex-1 text-center py-2 border rounded cursor-pointer ${category === 'General Inquiry' ? 'bg-gray-200' : ''}`}
                onClick={() => handleCategoryClick('General Inquiry')}
              >
                <div className="flex justify-center items-center">
                  <span className="text-lg">X {/**icon */}</span>
                </div>
                <div>General Inquiry</div>
              </div>
              <div
                className={`flex-1 text-center py-2 border rounded cursor-pointer ${category === 'Bug Report' ? 'bg-gray-200' : ''}`}
                onClick={() => handleCategoryClick('Bug Report')}
              >
                <div className="flex justify-center items-center">
                  <span className="text-lg">X {/**icon */}</span>
                </div>
                <div>Bug Report</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex flex-row gap-2">
              <h2 className="font-semibold my-4">
                Date Submitted, Last Updated
              </h2>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <label htmlFor="submittedOn" className="block text-gray-700">
                  Submitted on
                </label>
                <input
                  type="date"
                  id="submittedOn"
                  className="mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastUpdated" className="block text-gray-700">
                  Last Updated
                </label>
                <input
                  type="date"
                  id="lastUpdated"
                  className="mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="priority" className="block text-gray-700">
                  Priority Level
                </label>
                <div className="flex flex-row gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Urgent</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Normal</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="options" className="block text-gray-700 mb-2">
              Low
            </label>
            <div className="flex flex-row gap-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Add Attachment</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Add Note</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Assign to</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchTickets;