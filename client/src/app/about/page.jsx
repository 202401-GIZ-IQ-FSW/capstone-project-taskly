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
    <div >
      
    </div>
  );
};

export default About;
