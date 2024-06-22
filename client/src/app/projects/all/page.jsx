// client/src/app/projects/AllProjects.jsx
'use client';
import React, { useEffect, useState } from 'react';
import fetcher from '@/_utils/fetcher';
import Link from 'next/link';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetcher('/v1/projects');
        setProjects(res);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);
  if (!projects) {
    return <div>Loading...</div>;
  }
  if (projects.length <= 0) {
    return <h1 className="font-bold text-3xl">there is no project yet</h1>;
  }

  return (
    <div className="m-4">
      <h1 className="mb-4">All Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link
              href={`/projects/${project._id}`}
              className="text-blue-600 underline">
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProjects;
