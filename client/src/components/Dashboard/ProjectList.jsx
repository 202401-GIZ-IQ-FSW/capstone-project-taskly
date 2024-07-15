import Link from 'next/link';

const ProjectList = ({ title, projects }) => {
  return (
    <div className="p-4 bg-light-blue w-1/2 rounded-lg shadow-lg mb-5">
      <h1 className="text-xl font-extrabold mb-3 text-gray-700">
        {title} ({projects ? projects.length : '0'})
      </h1>
      <hr className="w-1/2 mb-4 border-gray-700" />
      <div className="flex flex-wrap">
        {projects &&
          projects.map((project) => (
            <Link
              key={project._id}
              href={`/account/projects/${project._id}/tickets`}
              className="flex-1 min-w-[200px] max-w-[250px]">
              <div className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-md font-semibold mb-1 text-custom-blue">
                  {project.name || ''}
                </h3>
                <p className="text-gray-600 text-sm">
                  {project.description || ''}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
