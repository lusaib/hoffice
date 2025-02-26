import { motion } from "framer-motion";
import { tailwindCj } from "../../utils";

/**
 * @author Lusaib Latheef
 * @description The spinner loader function component.
 */
export const SpinnerLoader = ({ className }) => (
  <motion.div
    className={tailwindCj(
      "w-12 h-12 border-4 border-primary border-t-transparent rounded-full",
      className
    )}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

/**
 * @author Lusaib Latheef
 * @description The pulse loading component.
 */
export const PulseLoader = ({ className }) => (
  <div className="flex gap-2">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className={tailwindCj("w-4 h-4 bg-primary rounded-full", className)}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

/**
 * @author Lusaib Latheef
 * @description The line loader component.
 */
export const LineLoader = ({ outerClassName, className }) => (
  <div
    className={tailwindCj(
      "w-48 h-2 bg-gray-200 rounded-full overflow-hidden",
      outerClassName
    )}
  >
    <motion.div
      className={tailwindCj("h-full bg-primary", className)}
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

/**
 * @author Lusaib Latheef
 * @description The dots loader component.
 */
export const DotsLoader = ({ className, gap = 1 }) => (
  <div className={tailwindCj(`flex gap-${gap}`)}>
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className={tailwindCj("w-2 h-2 bg-primary rounded-full", className)}
        animate={{
          y: ["0%", "-100%", "0%"],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

/**
 * @author Lusaib Latheef
 * @description The circular loader component.
 */
export const CircularProgress = ({ className }) => (
  <motion.div
    className={tailwindCj(
      "w-10 h-10 border-4 border-blue-200 rounded-full",
      className
    )}
    style={{ borderTopColor: "#3B82F6" }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);
