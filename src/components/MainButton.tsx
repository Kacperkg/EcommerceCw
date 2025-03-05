import { easeInOut, motion } from "framer-motion";
import { MainButtonProp } from "../types/Universal";

export const MainButton = ({ name }: MainButtonProp) => {
  return (
    <motion.a
      className="px-[48px] py-[16px] border text-2xl uppercase cursor-pointer flex flex-col relative overflow-hidden"
      whileHover="hovered"
      initial="initial"
      style={{
        maxWidth: 'fit-content',
      }}
    >
      <motion.div
        className="absolute px-[48px] py-[16px] left-0 top-0"
        variants={{
          initial: {
            y: 0,
          },
          hovered: {
            y: "-200%",
            scale: 0.2,
            transition: { ease: easeInOut, duration: 0.2 },
          },
        }}
      >
        {name}
      </motion.div>
      <span className="opacity-[0%]">{name}</span>
      <motion.div
        className="absolute bg-(--primary) px-[48px] py-[16px] left-0 top-0 text-(--bg)"
        variants={{
          initial: {
            y: "150%",
            scale: 1,
          },
          hovered: {
            y: 0,
            scale: 1,
            transition: { ease: easeInOut, duration: 0.2 },
          },
        }}
      >
        {name}
      </motion.div>
    </motion.a>
  );
};

{
  /* <motion.span
        className="absolute "
        variants={{
          initial: {
            y: 0,
          },
          hovered: {
            y: "-200%",
            scale: 0.2
          },
        }}
      >
        {name}
      </motion.span> */
}

{
  /* <motion.span
        className="absolute"
        variants={{
          initial: {
            y: "150%",
            scale: 0.5
          },
          hovered: {
            y: 0,
            scale: 1
          },
        }}
      >
        {name}
      </motion.span> */
}
