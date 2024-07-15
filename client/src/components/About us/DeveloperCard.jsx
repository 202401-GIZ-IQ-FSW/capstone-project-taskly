import React from 'react';

const teamMembers = [
  {
    name: 'Ahmed Essam',
    imageUrl: '/assets/Ahmed.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ahmed-essam-m/',
    GitHubUrl: 'https://github.com/IamAhmedly'
  },
  {
    name: 'Ninos Dinkha',
    imageUrl: '/assets/Ninos.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ninosdinkha/',
    GitHubUrl: 'https://github.com/Ninnoss'
  },
  {
    name: 'Elaf Gardi',
    imageUrl: '/assets/Elaf.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/elaf-ghassan/',
    GitHubUrl: 'https://github.com/Elaf-Gardi'
  },
  {
    name: 'Meer Atta',
    imageUrl: '/assets/Meer.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/meer-atta-b825b4229/',
    GitHubUrl: 'https://github.com/Meerata'
  },
  {
    name: 'Ali Izz-aldin',
    imageUrl: '/assets/Ali.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ali-izz-aldin-406975298/',
    GitHubUrl: 'https://github.com/r0deo'
  },
];

const DeveloperCard = () => {
  return (
    <div className="px-2 py-4 mt-16 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center items-center text-center">
      {teamMembers.map((member, index) => (
        <div key={index} className="mb-8 mx-4 md:mx-7">
          <img
            className="inline-flex object-cover border-4 border-sky-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-sky-600/100 bg-sky-50 text-sky-600 h-24 w-24 sm:h-32 sm:w-32"
            src={member.imageUrl}
            alt={member.name}
          />
          <h1 className="text-xl text-gray-700 font-bold mt-2">{member.name}</h1>
          <div className="flex justify-center items-center mt-1 space-x-4">
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
            )}
            {member.GitHubUrl && (
              <a
                href={member.GitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeveloperCard;
