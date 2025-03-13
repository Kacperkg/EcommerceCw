import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainButton } from "../components/MainButton";
import { motion } from "framer-motion";
import heroImage from "../assets/home/hero.jpg"; // Import the hero image

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="z-[99] pt-[32px]">
        <Navbar />
        <div className="max-w-[1440px] m-auto">
          <AboutHero />
          <AboutContent />
          <Values />
          <Team />
        </div>
      </div>
      <div className="mt-auto">
        <div className="max-w-[1440px] m-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const AboutHero = () => {
  return (
    <div 
      className="relative h-[40vh] w-full overflow-hidden border-r border-l border-b"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-7xl font-medium text-white"
        >
          About Essence
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl max-w-[60%] text-center text-white"
        >
          Inspired by Nature, Designed for Modern Living, Crafted to Elevate Your Space
        </motion.p>
      </div>
    </div>
  );
};

const AboutContent = () => {
  return (
    <section className="flex flex-col md:flex-row gap-12 mt-[128px] px-[32px]">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-medium mb-6">Our Story</h2>
        <p className="text-lg mb-6">
          Founded in 2025, Essence was born from a passion for thoughtful design and sustainable craftsmanship. We believe that furniture should not only be beautiful but should also tell a story and stand the test of time.
        </p>
        <p className="text-lg">
          Our journey began when a group of six designers and craftsmen came together with a shared vision: to create furniture that brings the calming influence of nature into modern urban homes. Each piece in our collection is carefully designed to balance aesthetic appeal with functional excellence.
        </p>
      </div>
      <div className="md:w-1/2 bg-[#f8f5f0] h-[400px] flex items-center justify-center">
        <p className="text-3xl italic px-8 text-center">"We believe in creating spaces that inspire peace, creativity, and connection."</p>
      </div>
    </section>
  );
};

const Values = () => {
  const ourValues = [
    {
      title: "Sustainability",
      description: "We use responsibly sourced materials and ensure our production processes minimize environmental impact."
    },
    {
      title: "Quality Craftsmanship",
      description: "Every piece is made with meticulous attention to detail by skilled artisans who take pride in their work."
    },
    {
      title: "Timeless Design",
      description: "We create furniture that transcends trends, pieces you'll love for years to come."
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We strive to provide exceptional service from browsing to delivery."
    }
  ];

  return (
    <section className="mt-[128px] px-[32px]">
      <h2 className="text-3xl font-medium mb-12 text-center">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ourValues.map((value, index) => (
          <div key={index} className="border p-6">
            <h3 className="text-2xl mb-4">{value.title}</h3>
            <p className="text-lg">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Team = () => {
  const teamMembers = [
    { name: "Kacper", role: "Founder & Design Director" },
    { name: "Alex", role: "Head of Production" },
    { name: "Omar", role: "Lead Designer" },
    { name: "Omair", role: "Customer Experience Manager" },
    { name: "Malachy", role: "Manufacturing Director" },
    { name: "Samir", role: "Sustainability Officer" }
  ];

  return (
    <section className="mt-[128px] mb-[128px] px-[32px]">
      <h2 className="text-3xl font-medium mb-12 text-center">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <div className="aspect-square bg-[#f8f5f0] mb-4"></div>
            <h3 className="text-xl font-medium">{member.name}</h3>
            <p className="text-lg text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
