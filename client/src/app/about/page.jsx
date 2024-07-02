'use client';
const imagesPath = '../../../public/images/';
import RecodedImage from  '../../../public/images/recoded.png'
 
const About = () => {
  // team data for links and images 
  const teamMembers = [
    {
      name: 'Ahmed Essam',
      imageUrl: require(`${imagesPath}Ahmed.jpg`),
      linkedinUrl: 'https://www.linkedin.com/in/ahmed-essam-m/',
    },
    {
      name: 'Ninos Dinkha',
      imageUrl: require(`${imagesPath}Ninos.jpg`),
      linkedinUrl: 'https://www.linkedin.com/in/ninosdinkha/',
    },
    {
      name: 'Elaf Gardi',
      imageUrl: require(`${imagesPath}Elaf.jpg`),
      linkedinUrl: 'https://www.linkedin.com/in/elaf-ghassan/',
    },
    {
      name: 'Meer Atta',
      imageUrl: require(`${imagesPath}Meer.jpg`),
      linkedinUrl: 'https://www.linkedin.com/in/meer-atta-b825b4229/',
    },
    {
      name: 'Ali Izz-aldin',
      imageUrl: require(`${imagesPath}Ali.jpg`),
      linkedinUrl: 'https://www.linkedin.com/in/ali-izz-aldin-406975298/',
    },
  ];
  return (
    <div className="flex flex-col items-center p-6 md:p-12 bg-gradient-to-br from-blue-200 to-green-200" >
       <section className="max-w-4xl w-full text-center">
        <h1 className="text-xl md:text-5xl font-bold mb-6">About Us</h1>
        <p className="text-lg md:text-xl mb-8">
        As a team in the Re:coded bootcamp for fullstack development, our primary objective is to create a user-friendly platform that streamlines the process of submitting, assigning, tracking, and resolving software-related tickets.</p>
        
        <div className="flex justify-center">
        <img 
          src={image} 
          alt="Team" 
          className="w-full max-w-md h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105" 
        />  
        </div>
          </section>
          <hr className="w-10/12 md:w-8/12 h-0.5 bg-gray-400 my-6" />

    </div>
  );
};

export default About;
