import clsx from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * @author Lusaib Latheef 
 * @description The tailwind class joiner custom util function to handle the joining of the tailwind classes on run time.
 */
export default function tailwindCj(...inputs) {
  return twMerge(clsx(inputs));
}
