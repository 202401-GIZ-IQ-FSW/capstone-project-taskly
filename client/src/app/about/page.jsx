'use client';
import React from "react";

  // team data for links and images 
const teamMembers = [
  {
    name: 'Ahmed Essam',
    imageUrl: '/Ahmed.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ahmed-essam-m/',
  },
  {
    name: 'Ninos Dinkha',
    imageUrl: '/Ninos.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ninosdinkha/',
  },
  {
    name: 'Elaf Gardi',
    imageUrl: '/Elaf.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/elaf-ghassan/',
  },
  {
    name: 'Meer Atta',
    imageUrl: '/Meer.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/meer-atta-b825b4229/',
  },
  {
    name: 'Ali Izz-aldin',
    imageUrl: '/Ali.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ali-izz-aldin-406975298/',
  },
];

 
const About = () => {
  // team data for links and images 
  
  return (
    <div className="flex flex-col items-center p-6 md:p-12 bg-gradient-to-br from-blue-200 to-green-200" >
       <section className="max-w-4xl w-full text-center">
        <h1 className="text-xl md:text-5xl font-bold mb-6">About Us</h1>
        <p className="text-lg md:text-xl mb-8">
        As a team in the Re:coded bootcamp for fullstack development, our primary objective is to create a user-friendly platform that streamlines the process of submitting, assigning, tracking, and resolving software-related tickets.</p>
        
        <div className="flex justify-center">
        <img 
          src="/recoded.png" 
          alt="Team" 
          className="w-full max-w-md h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105" 
        />  
        </div>
          </section>
          <hr className="w-10/12 md:w-8/12 h-0.5 bg-gray-400 my-6" />

          <section className="max-w-4xl w-full text-center mb-12 mt-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg md:text-xl">
        Our mission is to develop a cutting-edge Ticket Management System that empowers users to effortlessly submit detailed tickets,
         enables admins to assign tasks to the right developers, allows real-time tracking of ticket statuses,
          facilitates seamless communication through a built-in messaging system, empowers users to set priority levels for urgent issues,
           and provides valuable insights through an analytics dashboard showcasing ticket trends, response times, and resolution rates. 
        
              </p>
      </section>
      <hr className="w-10/12 md:w-8/12 h-0.5 bg-gray-400 my-6" />

      <section className="max-w-4xl w-full text-center bg-white bg-opacity-75 rounded-lg shadow-lg p-6">
        <h2 className="text-xl md:text-3xl font-bold mb-4">Our Amazing Team</h2>
        <div className="flex flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-48 m-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-auto rounded-lg transform transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold text-center"
                  >
                    View LinkedIn
                  </a>
                </div>
              </div>
              <p className="mt-2 text-lg font-bold">{member.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
