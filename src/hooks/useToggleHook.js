import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToggle, toggleWithStateCheck } from "../redux";
import { useLocation } from "react-router";

/**
 * @author Lusaib latheef
 * @since 19-09-2023
 * Toggle hook to return the toggle state for a component.
 * This hook can handle even if there is multiple toggle state in the function
 * @returns {object} - An object containing the function to get the toggle value and toggle function.
 *             {function(string | number): boolean} - isOpen function to return the toggle value according to the id passed.
 *             {function(string | number): boolean}  - Toggle function to handle the toggling accoring to the id
 */
const useToggle = () => {
  const dispatch = useDispatch();
  const toggles = useSelector((state) => state.toggle);

  const toggleToggle = useCallback(
    (toggleId, checkIfTrue = false) => {
      dispatch(toggleWithStateCheck({ toggleId, checkIfTrue }));
    },
    [dispatch]
  );

  const isOpen = useCallback(
    (toggleId) => {
      return toggles[toggleId] || false;
    },
    [toggles]
  );

  //clear the hook on route change
  const location = useLocation();

  const locationPath = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname === locationPath.current) return;
    locationPath.current = location.pathname;
    dispatch(clearToggle());
  }, [location.pathname]);

  return {
    isOpen,
    toggle: toggleToggle,
  };
};

export default useToggle;
