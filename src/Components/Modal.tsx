import { ReactNode, useEffect, useState } from "react";

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

    // Set a timeout equal to the animation duration before executing onClose
    // This ensures the animation completes before removing the modal from the DOM
    setTimeout(() => {
      closeModal();
    }, 500); // Match this duration to your animation duration
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-500`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className={`${wrapperStyle} shadow-xl transform relative transition-all duration-500 ${
          showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <div className="absolute top-[5%] right-[5%]">
          {!disableClose && <PlusIcon onClick={handleClose} />}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

const PlusIcon = ({ onClick }: { onClick: VoidFunction }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M11 13.5701H5V11.5701H11V5.57007H13V11.5701H19V13.5701H13V19.5701H11V13.5701Z"
      fill="#3E3E3E"
    />
  </svg>
);
