import heroImage from "../assets/home/hero.jpg";
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

const Home = () => {
  return (
    <>
      <div className="relative h-[100dvh]">
        <div className="absolute z-[99] inset-0 m-auto top-[32px]">
          <Navbar />
        </div>
        <Hero />
      </div>
      <section className="max-w-[1440px] m-auto">
        <div>
          <AboutUs />
          <Discover />
          <Categories/>
          <Footer />
        </div>
      </section>
    </>
  );
};

const Hero = () => {
  return (
    <div
      className="relative bg-center bg-cover h-[100dvh] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-(--black20) px-[32px] py-[16px] text-start"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="m-auto max-w-[1440px] mt-[35dvh]">
        <h1 className="relative z-10 text-(--white70) text-8xl font-bold max-w-[15ch]">
          FURNITURE FOR NOW OR FOREVER
        </h1>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section className="flex flex-col gap-[32px] mt-[128px]">
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
    <section className="grid grid-cols-4 gap-[12px] justify-between mt-[128px]">
      <div
        className="col-span-2 row-span-2 bg-blue-500 DiscoverImgMain"
        style={{
          backgroundImage: `url(${Discover1})`,
          backgroundPosition: "bottom",
          backgroundSize: 'cover'
        }}
      ></div>
      <div className="col-span-2 row-span 2 text-right uppercase text-2xl">
        <h3>Discover our</h3>
        <h3>unique furniture,</h3>
        <h3>designed for you by you</h3>
      </div>
      <DiscoverImage image={Discover2}/>
      <DiscoverImage image={Discover3}/>
      <div className="col-span-1 row-span-1 flex flex-col justify-end">
        <MainButton name="Explore more" />
      </div>
      <DiscoverImage image={Discover4}/>
      <DiscoverImage image={Discover5}/>
      <DiscoverImage image={Discover6}/>
    </section>
  );
};

const DiscoverImage = ({image}: DiscoverImageProp) => {
  return (
    <div className="col-span-1 row-span-1 DiscoverImg bg-red-600 self-end"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover'
    }}>
      </div>
  )
}

const Categories = () => {
  return (
<section>
  
</section>
  )
}

export default Home;
