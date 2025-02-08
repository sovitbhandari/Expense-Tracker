import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-gradient-to-b from-[#652931] to-[#F2994A] p-8 rounded-lg shadow-xl w-11/12 max-w-2xl 
                   transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button 
          className="absolute top-4 right-4 text-white text-xl hover:text-red-500"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
