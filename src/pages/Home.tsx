import sofaHero from "../assets/home/sofaHero.jpg";
import heroImage2 from "../assets/home/living-room.jpg";
import heroImage3 from "../assets/home/kitchen.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainButton } from "../components/MainButton";
import Discover1 from "../assets/home/discover/discover1.webp";
import Discover2 from "../assets/home/discover/discover2.webp";
import Discover3 from "../assets/home/discover/discover3.webp";
import Discover4 from "../assets/home/discover/discover4.jpg";
import Discover5 from "../assets/home/discover/discover5.avif";
import Discover6 from "../assets/home/discover/discover6.jpg";
import { DiscoverImageProp } from "../types/Home";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  { image: sofaHero, category: "Sofa", productName: "Sofa" },
  { image: heroImage2, category: "Living Room", productName: "Living Room" },
  { image: heroImage3, category: "Kitchen", productName: "Kitchen" },
];

const Home = () => {
  return (
    <>
      <div className="relative h-[100dvh]">
        <div className="absolute z-[99] inset-0 m-auto top-[32px]">
          <Navbar />
          <div className="max-w-[1440px] m-auto border-l border-r border-b">
            <Hero />
          </div>
        </div>
      </div>
      <section className="max-w-[1440px] m-auto">
        <div>
          <AboutUs />
          <Discover />
          <Footer />
        </div>
      </section>
    </>
  );
};

//TODO CHANGE THIS HERO TO A SLIDESHOW WITH PRODUCTS
const Hero = () => {
  const [index, setIndex] = useState(0);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[90dvh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${
            slides[(index + 1) % slides.length]?.image || slides[0].image
          })`,
        }}
      />

      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 overflow-hidden will-change-transform"
          initial={{ transform: "translateX(0%)" }}
          animate={{ transform: "translateX(-100%)" }}
          exit={{ transform: "translateX(-100%)" }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 4 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          />
          <motion.div
            key={index}
            className="absolute left-[32px] bottom-[32px] text-white p-4 rounded-lg text-left gap-[16px] flex flex-col text-nowrap"
          >
            <div className="relative w-fit text-2xl overflow-hidden">
              <motion.h3
                className="absolute"
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {slides[index].category}
              </motion.h3>
              <span className="opacity-0">{slides[index].category}</span>
            </div>
            <div className="relative w-fit h-fit text-9xl overflow-hidden pb-[16px]">
              <motion.h1
                className="absolute"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                {slides[index].productName}
              </motion.h1>
              <span className="opacity-0">{slides[index].productName}</span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section className="flex flex-col gap-[32px] mt-[256px]">
      <h2 className="text-5xl text-start font-[400]">
        Essence - Inspired by Nature, Designed for Modern Living, Crafted to
        Elevate Your Space
      </h2>
      <MainButton name="about us" />
    </section>
  );
};

const Discover = () => {
  return (
    <section className="grid grid-cols-4 gap-[12px] justify-between mt-[256px]">
      <DiscoverImageMain image={Discover1} />
      <div className="col-span-2 row-span 2 text-right uppercase text-2xl">
        <h3>Discover our</h3>
        <h3>unique furniture,</h3>
        <h3>designed for you by you</h3>
      </div>
      <DiscoverImage image={Discover2} />
      <DiscoverImage image={Discover3} />
      <div className="col-span-1 row-span-1 flex flex-col justify-end">
        <MainButton name="Explore more" />
      </div>
      <DiscoverImage image={Discover4} />
      <DiscoverImage image={Discover5} />
      <DiscoverImage image={Discover6} />
    </section>
  );
};

const DiscoverImageMain = ({ image }: DiscoverImageProp) => {
  return (
    <motion.a
      className="col-span-2 row-span-2 cursor-pointer relative overflow-hidden"
      whileHover="hoveredCard"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          aspectRatio: "1/.8",
        }}
        variants={{
          initial: { scale: 1.05 },
          hoveredCard: {
            scale: 1,
            transition: { ease: "easeInOut", duration: 0.2 },
          },
        }}
      />
      <motion.div
        className="flex items-center justify-between px-[16px] py-[16px] text-xl bg-white border border-(--black20) absolute w-full bottom-0 uppercase"
        variants={{
          initial: {
            y: "100%",
          },
          hoveredCard: {
            y: 0,
            transition: { ease: easeInOut, duration: 0.2 },
          },
        }}
      >
        <h1 className="font-[400]">Product Name</h1>
        <h2 className="text-base">Category</h2>
      </motion.div>
    </motion.a>
  );
};

const DiscoverImage = ({ image }: DiscoverImageProp) => {
  return (
    <motion.a
      className="col-span-1 row-span-1 DiscoverImg self-end cursor-pointer relative overflow-hidden aspect-square"
      whileHover="hoveredCard"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
        variants={{
          initial: { scale: 1.05 },
          hoveredCard: {
            scale: 1,
            transition: { ease: "easeInOut", duration: 0.2 },
          },
        }}
      />
      <motion.div
        className="flex items-center justify-between px-[16px] py-[16px] text-xl bg-white border border-(--black20) absolute w-full bottom-0 uppercase"
        variants={{
          initial: {
            y: "100%",
          },
          hoveredCard: {
            y: 0,
            transition: { ease: easeInOut, duration: 0.2 },
          },
        }}
      >
        <h1 className="font-[400]">Product Name</h1>
        <h2 className="text-base">Category</h2>
      </motion.div>
    </motion.a>
  );
};

const Categories = () => {
  const Categories = [
    "Sofas, ",
    "Chairs, ",
    "Desks, ",
    "Benches, ",
    "Dining Tables, ",
    "Stools and more",
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="mt-[256px] text-left">
      <h3 className="text-base pb-[12px]">OUR CATEGORIES</h3>
      <div className="flex text-5xl max-w-[50dvw] flex-wrap">
        {Categories.map((category, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`transition-colors duration-300 cursor-default ${
              hoveredIndex === null || hoveredIndex === index
                ? "text-black"
                : "text-(--black20)"
            }`}
          >
            {category.replace(/ /g, "\u00A0")}
          </div>
        ))}
      </div>
      <div>TODO</div>
    </section>
  );
};

export default Home;
