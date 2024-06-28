// client\src\components\Dashboard\ProjectList.jsx
import Link from 'next/link';

const ProjectList = ({ title, projects }) => {
  return (
    <div>
      <h1 className="font-extrabold">
        {title} ({projects ? projects.length : '0'})
      </h1>
      <hr className="w-full" />
      {projects &&
        projects.map((project) => (
          <Link
            key={project._id}
            href={`/account/projects/${project._id}/tickets`}>
            <div className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold">{project.name || ''}</h3>
              <p className="text-gray-600">{project.description || ''}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProjectList;
