// client\src\app\projects\new\page.jsx
'use client';
import React, { useState } from 'react';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';

export default function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); // Generates a random number 
  };


  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const res = await fetcher('/v1/projects/', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
      });

      if (res._id) {
        setNotificationMessage(
          `Project added successfully. Add a new project or go to <a href="/projects/all" class="text-blue-600 underline">All Projects</a> or <a href="/tickets/new" class="text-blue-600 underline">Add New Ticket</a><span hidden>${generateRandomNumber()}</span>`
        );
        setNotificationType('success');
        setName('');
        setDescription('');
      } else {
        setNotificationMessage(`Failed to add project, MSG: ${res.message}<span hidden>${generateRandomNumber()}</span>`);
        setNotificationType('error');
      }
    } catch (error) {
      setNotificationMessage(`Failed to add project, MSG: ${error.message}<span hidden>${generateRandomNumber()}</span>`);
      setNotificationType('error');
    }
  };

  return (
    <>
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Create a new Project</h1>
        <form
          onSubmit={handleCreate}
          className="mx-auto bg-white border p-6 rounded w-1/3">
          <div className="mb-3">
            <label>Name</label>
            <div>
              <input
                type="text"
                id="name"
                placeholder="Project Name"
                name="name"
                className="border w-full p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Description</label>
            <div>
              <input
                type="text"
                id="description"
                className="border w-full p-2"
                placeholder="Project Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Create"
            className="bg-gray-500 text-white px-4 py-2 rounded mx-4 w-full border"
          />
        </form>
      </div>
      <Notification message={notificationMessage} type={notificationType} />
    </>
  );
}
