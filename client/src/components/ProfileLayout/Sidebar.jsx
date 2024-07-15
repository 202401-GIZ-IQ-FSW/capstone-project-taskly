import { sidebarNavigation } from '@/data/sidebarNavigation';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaCog } from 'react-icons/fa';
import ProjectSelectDropdown from '../Dropdowns/ProjectSelectDropdown';

const Sidebar = ({
  pathname,
  sidebarCollapsed,
  setSidebarCollapsed,
  projects,
  selectedProject,
  setSelectedProject,
}) => {
  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project);
    console.log('selected project is ', project?.name);
  };

  return (
    <div
      className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col ${
        sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
      }`}>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=black&shade=600"
              alt="Your Company"
            />
          </Link>
        </div>
        <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
          <ProjectSelectDropdown
            projects={projects}
            selectedProject={selectedProject}
            onProjectChange={handleProjectChange}
          />
          {/* <ul className="space-y-1">
            {projects?.map((project) => (
              <li
                key={project._id}
                onClick={handleProjectChange}
                className={`cursor-pointer p-2 ${
                  selectedProject && selectedProject._id === project._id
                    ? 'bg-gray-200'
                    : ''
                }`}>
                {project.name}
              </li>
            ))}
          </ul> */}
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute inset-y-1/2 transform -translate-y-1/2 -right-3 bg-gray-200 hover:bg-gray-300 px-2 py-4 rounded-full shadow-md focus:outline-none flex items-center justify-center">
          <div>{sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}</div>
        </button>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {sidebarNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                        pathname === item.href
                          ? 'bg-gray-50 text-black'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                      }`}>
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${
                          pathname === item.href
                            ? 'text-black'
                            : 'text-gray-400 group-hover:text-black'
                        }`}
                        aria-hidden="true"
                      />
                      {!sidebarCollapsed && item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <Link
                href="/account/settings"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-black">
                <FaCog
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-black"
                  aria-hidden="true"
                />
                {!sidebarCollapsed && 'Settings'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
