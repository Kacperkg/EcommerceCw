import { motion } from "framer-motion";
import { MainButtonProp } from "../types/Universal";
import { useState } from "react";

export const MainButton = ({ name }: MainButtonProp) => {
  const [bottomMargin, setBottomMargin] = useState(false);

  return (
    <motion.a
      className="px-[48px] py-[16px] border text-2xl uppercase cursor-pointer max-w-fit flex flex-col relative overflow-hidden"
      whileHover="hovered"
      initial="initial"
    >
      <motion.span
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
      </motion.span>
      <span className="opacity-[0%]">{name}</span>
      <motion.span
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
      </motion.span>
    </motion.a>
  );
};
