import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { tailwindCj } from "../../utils";

/**
 * @author Lusaib Latheef
 * @description The modal component to handle the opening of the modal component to show a modal
 */
const Modal = ({
  isOpen,
  className,
  children,
  modalBgClassNames = "",
  rootClassNames = "",
  onOutsideClick,
}) => {
  const defaultModalClass =
    "min-h-[126px] bg-white outline-none rounded-md shadow-lg";
  const modalStyle = tailwindCj(defaultModalClass, className);

  const nodeRef = useRef(null);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Background */}
          <motion.div
            key="modal-bg"
            className={tailwindCj(
              "opacity-50 fixed inset-0 z-[var(--z-index-modal-bg)] bg-black",
              modalBgClassNames
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onOutsideClick}
          />

          {/* Modal Content */}
          <motion.div
            key="modal-content"
            className={tailwindCj(
              "fixed w-[100vw] h-[100vh] flex items-center justify-center z-[var(--z-index-modal)] left-0 top-0",
              rootClassNames
            )}
            ref={nodeRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if (!onOutsideClick) return;
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className={modalStyle}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};

export default Modal;
