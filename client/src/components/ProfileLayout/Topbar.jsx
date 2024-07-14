import { FaBars } from 'react-icons/fa';
import NotificationsDropdown from '../Dropdowns/NotificationsDropdown';
import UserIconDropdown from '../Dropdowns/UserIconDropdown';
import SearchBar from '../SearchTicket/SearchBar';

const Topbar = ({ user, setSidebarOpen, userNavigation }) => {
  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <FaBars className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 relative">
          <div className="w-full relative flex flex-col">
            <SearchBar />
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <NotificationsDropdown />
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />
            <UserIconDropdown user={user} userNavigation={userNavigation} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
