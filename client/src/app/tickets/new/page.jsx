// client\src\app\tickets\new\page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';
import { useRouter } from 'next/navigation';

export default function CreateTicket() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetcher('/v1/projects/');
        setProjects(res);
        // if (res.length > 0) {
        //   setProjectId(res[0]._id);
        // }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const res = await fetcher(`/v1/projects/${projectId}/tickets`, {
        method: 'POST',
        body: JSON.stringify({ title, description, priority }),
      });

      if (res.ticket??_id) {
        setNotificationMessage('Ticket added successfully.');
        setNotificationType('success');
        setTitle('');
        setDescription('');
        setPriority('medium');
      } else {
        setNotificationMessage(`Failed to add ticket, MSG: ${res.message}`);
        setNotificationType('error');
      }
    } catch (error) {
      setNotificationMessage(`Failed to add ticket, MSG: ${error.message}`);
      setNotificationType('error');
    }
  };

  const handleProjectChange = (e) => {
    const selectedProjectId = e.target.value;
    if (selectedProjectId === 'new') {
      router.push('/projects/new');
    } else {
      setProjectId(selectedProjectId);
    }
  };

  return (
    <>
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Create a new Ticket</h1>
        <form
          onSubmit={handleCreate}
          className="mx-auto bg-white border p-6 rounded w-1/3">
          <div className="mb-3">
            <label>Project</label>
            <div>
              <select
                className="border w-full p-2"
                value={projectId}
                onChange={handleProjectChange}>
                <option
                  defaultValue
                  hidden
                  className="text-blue-600 cursor-pointer">
                  Select Project
                </option>
                <option value="new" className="text-blue-600 cursor-pointer">
                  Create a new Project
                </option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label>Title</label>
            <div>
              <input
                type="text"
                id="title"
                placeholder="Ticket Title"
                name="title"
                className="border w-full p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Description</label>
            <div>
              <textarea
                id="description"
                className="border w-full p-2"
                placeholder="Ticket Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Priority</label>
            <div>
              <select
                className="border w-full p-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Create"
            className="bg-gray-500 text-white px-4 py-2 rounded mx-4 w-full border"
          />
        </form>
      </div>
      <Notification
        message={notificationMessage}
        type={notificationType}
        duration={30000}
      />
    </>
  );
}
