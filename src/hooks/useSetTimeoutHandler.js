import { useRef, useEffect } from "react";

/**
 * @author Lusaib latheef
 * @description The custom hook function to hanlde the timeouts.
 */
export default function useSetTimeoutHandler() {
  // Use a ref to store the timeouts by key
  const timeoutsRef = useRef({});

  // Function to set a timeout and store its ID by key, with a callback function
  const setTimer = (key, delay, callback) => {
    if (timeoutsRef.current[key]) {
      clearTimeout(timeoutsRef.current[key]);
    }

    const timeoutId = setTimeout(() => {
      if (typeof callback === "function") {
        callback(); // Execute the passed callback when the timer finishes
      }
      delete timeoutsRef.current[key];
    }, delay);

    timeoutsRef.current[key] = timeoutId;
  };

  // Function to clear a specific timer by key
  const clearTimer = (key) => {
    if (timeoutsRef.current[key]) {
      clearTimeout(timeoutsRef.current[key]);
      delete timeoutsRef.current[key];
      console.log(`Timeout ${key} cleared`);
    }
  };

  // Cleanup: Clear all timeouts when the component using this hook unmounts
  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;
    return () => {
      Object.keys(currentTimeouts).forEach((key) => {
        clearTimeout(currentTimeouts[key]);
      });
    };
  }, []);

  return { setTimer, clearTimer };
}
