'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MobileSidebar from '@/components/Navigation/MobileSidebar/MobileSidebar';

import { useUser } from '@/hooks/useUser';
import Topbar from '@/components/ProfileLayout/Topbar';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import Sidebar from '@/components/ProfileLayout/Sidebar';

const ProfileLayout = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { user, handleLogout } = useUser();
  const { projects, selectedProject, setSelectedProject, error } =
    useProjects();

  const userNavigation = [
    { name: 'Home Page', href: '/' },
    { name: 'Your profile', href: '/account' },
    { name: 'Sign out', href: '/', onClick: () => handleLogout() },
  ];

  const handleProjectChange = (e) => {
    const project = projects.find((p) => p._id === e.target.value);
    setSelectedProject(project);
  };

  return (
    <>
      <div>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Sidebar
          userNavigation={userNavigation}
          pathname={pathname}
          user={user}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          projects={projects}
          selectedProject={selectedProject}
          handleProjectChange={handleProjectChange}
        />
        <div className={`${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
          <Topbar
            user={user}
            setSidebarOpen={setSidebarOpen}
            userNavigation={userNavigation}
          />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProfileLayout;
