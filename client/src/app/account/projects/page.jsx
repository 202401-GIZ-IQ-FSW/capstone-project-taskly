'use client';
import Link from 'next/link';
import fetcher from '@/_utils/fetcher';
import { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetcher('/v1/projects');
        setProjects(data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.length === 0 ? (
        <div className="text-center">You don't have any projects. Start by creating one.</div>
      ) : (
        projects.map((project) => (
          <Link
            key={project._id}
            href={`/account/projects/${project._id}/tickets`}>
            <div className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold">{project.name || ''}</h3>
              <p className="text-gray-600">{project.description || ''}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Projects;
