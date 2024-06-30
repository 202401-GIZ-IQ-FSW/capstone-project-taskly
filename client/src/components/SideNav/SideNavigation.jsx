import React from 'react';
import { Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon from react-icons

const SideNavigation = ({ isOpen, onClose, children }) => {
  return (
    <Transition
      show={isOpen}
      enter="transform transition-transform ease-in-out duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition-transform ease-in-out duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full">
      {(ref) => (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-end min-h-screen px-4 py-6 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <Transition
              as={React.Fragment}
              enter="bg-black bg-opacity-50 fixed inset-0 transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="bg-black bg-opacity-50 fixed inset-0 transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              />
            </Transition>
            {/* Side navigation content */}
            <Transition
              as={React.Fragment}
              enter="transform transition-transform ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition-transform ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline">
              <div className="h-full flex flex-col bg-white">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex justify-end">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={onClose} // Close button
                  >
                    <AiOutlineClose className="w-6 h-6" />
                  </button>
                </div>
                {/* Main content */}
                <div className="flex-grow p-4 overflow-y-auto">{children}</div>
              </div>
            </Transition>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default SideNavigation;
