import { motion } from "framer-motion";

const AnimatedButton = ({ children, href }) => {
  const DURATION = 0.25;
  const STAGGER = 0.025;

  return (
    <motion.div
      className="w-fit cursor-pointer"
      whileHover="hovered"
      initial="initial"
      whileTap={{ scale: 0.95 }}
    >
      <motion.a
        href={href}
        className="relative block overflow-hidden py-[1px]"
        style={{ lineHeight: 0.75 }}
      >
        {/* First Line */}
        <div>
          {children.split("").map((l, i) => (
            <motion.span
              key={`top-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </div>

        {/* Second Line (Animated on Hover) */}
        <div className="absolute inset-0 flex">
          {children.split("").map((l, i) => (
            <motion.span
              key={`bottom-${i}`}
              variants={{
                initial: { y: "120%" },
                hovered: { y: 1 },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </div>
      </motion.a>
    </motion.div>
  );
};

export default AnimatedButton;
