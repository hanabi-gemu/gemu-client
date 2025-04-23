import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CloseModalButton from "./CloseModalButton";

type ModalProps = {
  isOpen: boolean;
  closeModal: VoidFunction;
  children: ReactNode;
  wrapperStyle?: string;
  disableClose?: boolean;
};

const Modal = ({
  isOpen,
  closeModal,
  children,
  wrapperStyle,
  disableClose = false,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    // Start the closing animation
    setShowModal(false);
    // Timeout matches the animation duration (500ms)
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  // The modal content
  const modalContent = (
    <div
      className={`fixed inset-0 z-[100000] flex items-center justify-center ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-500`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={!disableClose ? handleClose : undefined} // Allow closing on outside click if desired
    >
      <div
        className={`${wrapperStyle} shadow-xl transform border-[4px] border-[rgba(255,_255,_255,_0.40) relative transition-all duration-500 ${
          showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        {!disableClose && (
          <div
            className="absolute top-[2%] right-[3%] z-10"
            onClick={handleClose}
          >
            <CloseModalButton />
          </div>
        )}
        {children}
      </div>
    </div>
  );

  // Use a portal to ensure the modal overlays the entire DOM
  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
