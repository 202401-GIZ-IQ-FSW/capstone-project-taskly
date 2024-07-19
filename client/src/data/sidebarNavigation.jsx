import { FaCalendar, FaChartPie, FaFolder, FaHome } from 'react-icons/fa';
import { MdViewKanban } from 'react-icons/md';

export const sidebarNavigation = [
  { name: 'Dashboard', href: '/account/dashboard', icon: FaHome },
  { name: 'Project', href: '/account/projects', icon: FaFolder },
  { name: 'Tickets', href: '/account/tickets', icon: FaCalendar },
  { name: 'Kanban', href: '/account/kanban', icon: MdViewKanban },
  { name: 'Analytics', href: '/account/analytics', icon: FaChartPie },
];
