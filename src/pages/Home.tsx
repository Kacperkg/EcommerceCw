import { motion } from "framer-motion";
import heroImage from "../assets/home/hero.jpg";
import { PerksCardProps, RoomCardProps } from "../types/Home";
import React, { useState } from "react";
import BedroomImg from "../assets/home/bedroom.jpg";
import LivingRoomImg from "../assets/home/living-room.jpg";
import KitchenImg from "../assets/home/kitchen.jpg";
import BathroomImg from "../assets/home/bathroom.jpg";
import OfficeImg from "../assets/home/office.jpg";

const Home = () => {
  return (
    <section className="mt-[32px]">
      <Hero />
      <Collection />
      <Perks />
      <ShopByRoom />
    </section>
  );
};

const Hero = () => {
  return (
    <div
      className="relative rounded-xl bg-center bg-cover h-[70dvh] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-(--black10) px-[32px] py-[16px] text-start"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <h1 className="relative z-10 text-(--white70) text-8xl font-bold max-w-[15ch]">
        FURNITURE FOR NOW OR FOREVER
      </h1>
      <div className="relative z-10"></div>
    </div>
  );
};

const Collection = () => {
  return (
    <aside className="mt-[32px]">
      <div className="flex justify-between items-center pt-[64px] pb-[32px]">
        <h1 className="text-[64px] text-(--secondary)">Our Collections</h1>
        <motion.button
          className="border rounded-full aspect-square p-4 border-(--secondary)"
          whileHover={{
            rotate: 25,
            transition: { duration: 0.5 },
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="" className="text-(--secondary) text-2xl">
            View All
          </a>
        </motion.button>
      </div>
      <div className="flex justify-between">
        {/* Change this into a .map for i later */}
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
    </aside>
  );
};

const CollectionCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.95 }}
      className="aspect-square h-[304px] rounded-3xl bg-red-500"
    ></motion.div>
  );
};

const Perks = () => {
  return (
    <div className="mt-[128px] flex justify-between">
      <PerksCard
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
          >
            <path
              d="M44 77.7V50.3L20 36.4V63.8L44 77.7ZM52 77.7L76 63.8V36.4L52 50.3V77.7ZM44 86.9L16 70.8C14.7333 70.0667 13.75 69.1 13.05 67.9C12.35 66.7 12 65.3667 12 63.9V32.1C12 30.6333 12.35 29.3 13.05 28.1C13.75 26.9 14.7333 25.9333 16 25.2L44 9.1C45.2667 8.36667 46.6 8 48 8C49.4 8 50.7333 8.36667 52 9.1L80 25.2C81.2667 25.9333 82.25 26.9 82.95 28.1C83.65 29.3 84 30.6333 84 32.1V63.9C84 65.3667 83.65 66.7 82.95 67.9C82.25 69.1 81.2667 70.0667 80 70.8L52 86.9C50.7333 87.6333 49.4 88 48 88C46.6 88 45.2667 87.6333 44 86.9ZM64 34.1L71.7 29.7L48 16L40.2 20.5L64 34.1ZM48 43.4L55.8 38.9L32.1 25.2L24.3 29.7L48 43.4Z"
              fill="black"
              fill-opacity="0.7"
            />
          </svg>
        }
        title={"Made to Order"}
        desc={"All Pieces made to order for you"}
      />
      <PerksCard
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
          >
            <path
              d="M22.412 79.9C19.1373 79.9 16.35 78.7527 14.05 76.458C11.75 74.164 10.6 71.378 10.6 68.1H4V22C4 20.4 4.6 19 5.8 17.8C7 16.6 8.4 16 10 16H67.9V32.7H78.4L92 50.8V68.1H84.9C84.9 71.378 83.754 74.164 81.462 76.458C79.17 78.7527 76.3867 79.9 73.112 79.9C69.8373 79.9 67.05 78.7527 64.75 76.458C62.45 74.164 61.3 71.378 61.3 68.1H34.2C34.2 71.3667 33.054 74.15 30.762 76.45C28.47 78.75 25.6867 79.9 22.412 79.9ZM22.4 73.9C24 73.9 25.3667 73.3333 26.5 72.2C27.6333 71.0667 28.2 69.7 28.2 68.1C28.2 66.5 27.6333 65.1333 26.5 64C25.3667 62.8667 24 62.3 22.4 62.3C20.8 62.3 19.4333 62.8667 18.3 64C17.1667 65.1333 16.6 66.5 16.6 68.1C16.6 69.7 17.1667 71.0667 18.3 72.2C19.4333 73.3333 20.8 73.9 22.4 73.9ZM10 62.1H12.2C13.3333 60.3 14.768 58.8667 16.504 57.8C18.24 56.7333 20.1733 56.2 22.304 56.2C24.4347 56.2 26.3833 56.75 28.15 57.85C29.9167 58.95 31.3667 60.3667 32.5 62.1H61.9V22H10V62.1ZM73.1 73.9C74.7 73.9 76.0667 73.3333 77.2 72.2C78.3333 71.0667 78.9 69.7 78.9 68.1C78.9 66.5 78.3333 65.1333 77.2 64C76.0667 62.8667 74.7 62.3 73.1 62.3C71.5 62.3 70.1333 62.8667 69 64C67.8667 65.1333 67.3 66.5 67.3 68.1C67.3 69.7 67.8667 71.0667 69 72.2C70.1333 73.3333 71.5 73.9 73.1 73.9ZM67.9 53.5H86.5L75.4 38.7H67.9V53.5Z"
              fill="black"
              fill-opacity="0.7"
            />
          </svg>
        }
        title={"Free Delivery"}
        desc={"Free Delivery for order-World-Wide"}
      />
      <PerksCard
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
          >
            <path
              d="M48 92C40.5333 92 33.3333 89.8 26.4 85.4C19.4667 81 14 75.9667 10 70.3V84H4V60H28V66H14.3C17.7 71.1333 22.55 75.75 28.85 79.85C35.15 83.95 41.5333 86 48 86C53.2 86 58.1167 85 62.75 83C67.3833 81 71.4167 78.2833 74.85 74.85C78.2833 71.4167 81 67.3833 83 62.75C85 58.1167 86 53.2 86 48H92C92 54.0667 90.85 59.7667 88.55 65.1C86.25 70.4333 83.1 75.1 79.1 79.1C75.1 83.1 70.4333 86.25 65.1 88.55C59.7667 90.85 54.0667 92 48 92ZM4 48C4 41.9333 5.15 36.2333 7.45 30.9C9.75 25.5667 12.9 20.9 16.9 16.9C20.9 12.9 25.5667 9.75 30.9 7.45C36.2333 5.15 41.9333 4 48 4C55.4667 4 62.6667 6.2 69.6 10.6C76.5333 15 82 20.0333 86 25.7V12H92V36H68V30H81.7C78.3 24.8667 73.4667 20.25 67.2 16.15C60.9333 12.05 54.5333 10 48 10C42.8 10 37.8833 11 33.25 13C28.6167 15 24.5833 17.7167 21.15 21.15C17.7167 24.5833 15 28.6167 13 33.25C11 37.8833 10 42.8 10 48H4ZM47.7 71.4C48.7667 71.4 49.6667 71.0333 50.4 70.3C51.1333 69.5667 51.5 68.6667 51.5 67.6C51.5 66.5333 51.1333 65.6333 50.4 64.9C49.6667 64.1667 48.7667 63.8 47.7 63.8C46.6333 63.8 45.7333 64.1667 45 64.9C44.2667 64.6333 43.9 66.5333 43.9 67.6C43.9 68.6667 44.2667 69.5667 45 70.3C45.7333 71.0333 46.6333 71.4 47.7 71.4ZM44.4 56.6H50.1C50.1 54.5333 50.4333 52.85 51.1 51.55C51.7667 50.25 52.9333 48.7667 54.6 47.1C56.8 44.9 58.3333 42.95 59.2 41.25C60.0667 39.55 60.5 37.7667 60.5 35.9C60.5 32.4333 59.3 29.65 56.9 27.55C54.5 25.45 51.5 24.4 47.9 24.4C44.6333 24.4 41.7667 25.1833 39.3 26.75C36.8333 28.3167 35 30.6 33.8 33.6L39.1 35.8C39.9667 34.0667 41.1667 32.6833 42.7 31.65C44.2333 30.6167 45.9667 30.1 47.9 30.1C49.8333 30.1 51.4667 30.6333 52.8 31.7C54.1333 32.7667 54.8 34.2333 54.8 36.1C54.8 37.4333 54.4333 38.7167 53.7 39.95C52.9667 41.1833 51.7333 42.6333 50 44.3C47.5333 46.6333 45.9833 48.6333 45.35 50.3C44.7167 51.9667 44.4 54.0667 44.4 56.6Z"
              fill="black"
              fill-opacity="0.7"
            />
          </svg>
        }
        title={"Free Exchange"}
        desc={"Free Exchange on all products"}
      />
    </div>
  );
};

const PerksCard = ({ svg, title, desc }: PerksCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[12px] bg-(--bg2) p-[32px] rounded-3xl max-w-[428px] flex-auto aspect-square">
      {svg}
      <div className="flex flex-col gap-[8px]">
        <h3 className="text-4xl">{title}</h3>
        <p className="text-xl text-(--secondary)">{desc}</p>
      </div>
    </div>
  );
};

const ShopByRoom = () => {
  const [hoveredImage, setHoveredImage] = useState<{ src: string; rotate: string } | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="mt-[128px]" onMouseMove={handleMouseMove}>
      <h1 className="text-left text-[64px] text-(--secondary)">Shop By Room</h1>
      <div className="content-[''] bg-(--secondary) w-full h-[2px] mt-[32px]"></div>
      <RoomCard index={"01"} Room={"Living Room"} Images={LivingRoomImg} rotate={"15deg"} setHoveredImage={setHoveredImage} />
      <RoomDivider />
      <RoomCard index={"02"} Room={"Bedroom"} Images={BedroomImg} rotate={"-10deg"} setHoveredImage={setHoveredImage} />
      <RoomDivider />
      <RoomCard index={"03"} Room={"Office"} Images={OfficeImg} rotate={"20deg"} setHoveredImage={setHoveredImage} />
      <RoomDivider />
      <RoomCard index={"04"} Room={"Kitchen"} rotate={"-5deg"} Images={KitchenImg} setHoveredImage={setHoveredImage} />
      <RoomDivider />
      <RoomCard index={"05"} Room={"Bathroom"} rotate={"10deg"} Images={BathroomImg} setHoveredImage={setHoveredImage} />
      <RoomDivider />
      {hoveredImage && (
        <img
          src={hoveredImage.src}
          alt={hoveredImage.src}
          style={{
            borderRadius: "24px",
            rotate: hoveredImage.rotate,
            position: "fixed",
            top: cursorPosition.y - 112.5,
            left: cursorPosition.x - 112.5,
            width: "225px",
            height: "225px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
};

const RoomCard = ({ index, Room, Images, rotate, setHoveredImage }: RoomCardProps & { rotate: string; setHoveredImage: (image: { src: string; rotate: string } | null) => void }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="flex justify-between items-center py-[32px] cursor-none"
      onHoverStart={() => {
        setIsHovered(true);
        setHoveredImage({ src: Images, rotate });
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        setHoveredImage(null);
      }}
    >
      <div className="flex gap-[24px] text-2xl">
        <h2 style={{ fontSize: isHovered ? "48px" : "24px", transition: "font-size 0.3s ease-in-out", color: isHovered ? 'var(--primary)' : 'var(--secondary)' }}>{index}</h2>
        <h2 style={{ fontSize: isHovered ? "48px" : "24px", transition: "font-size 0.3s ease-in-out", color: isHovered ? 'var(--primary)' : 'var(--secondary)'  }}>{Room}</h2>
      </div>
      <svg
        style={{
          transform: isHovered ? "scale(1.5)" : "scale(1)",
          transition: "transform 0.3s ease-in-out"
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
      >
        <path
          d="M17 17.5L17 1.5M17 1.5L0.999999 1.5M17 1.5L1 17.5"
          stroke="black"
          stroke-opacity="0.7"
          stroke-width="2"
        />
      </svg>
    </motion.div>
  );
};

const RoomDivider = () => {
    return (
        <div className="content-[''] bg-(--secondary) w-full h-[2px]"></div>
    )
}

export default Home;
