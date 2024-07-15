import React from 'react';

const Services = () => {
  return (
    <div class="container relative flex flex-col justify-between h-full max-w-6xl px-10 my-24 mx-auto xl:px-0 mt-5">
      <div className="flex flex-col items-center">
        <h2 class="mb-1 text-3xl font-extrabold font-dancing leading-tight text-light-blue">
          Services
        </h2>
        <p class="text-2xl mb-12 font-roboto font-extrabold text-custom-blue">
          Here is a few of the awesome Services we provide.
        </p>
      </div>

      <div class="w-full">
        <div class="flex flex-col w-full mb-10 sm:flex-row">
          <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Commenting and Collaboration
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Add comments to tickets for better communication and
                  problem-solving. Collaborate with team members by sharing
                  insights and updates directly on the ticket.
                </p>
              </div>
            </div>
          </div>
          <div class="w-full sm:w-1/2">
            <div class="relative h-full ml-0 md:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Support for Multiple Departments
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Manage tickets across various departments such as IT, HR, and
                  customer service. Ensure all support requests are handled
                  efficiently, regardless of the department.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full mb-5 sm:flex-row">
          <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Role-Based Access Control
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Assign different roles and permissions to users. Ensure secure
                  access to sensitive information based on user roles.
                </p>
              </div>
            </div>
          </div>
          <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Historical Ticket Archive
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Access archived tickets for future reference. Maintain a
                  comprehensive record of past support issues and resolutions.
                </p>
              </div>
            </div>
          </div>
          <div class="w-full sm:w-1/2">
            <div class="relative h-full ml-0 md:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Attachment Support
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Attach screenshots, logs, or error reports to tickets. Provide
                  detailed information to help resolve issues more efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
