import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function AnimatedModal({ onClose }) {
  const modalRef = useRef();
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeWithAnimation();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function closeWithAnimation() {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
    }, 300); // match CSS animation duration
  }

  return createPortal(
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${animateOut ? "fadeOut" : "fadeIn"}`}>
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg transform transition-all scale-100">
        <h2 className="text-xl font-bold mb-4">Animated Modal</h2>
        <p>This modal has smooth enter/exit animations!</p>
        <button 
          onClick={closeWithAnimation}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function Task8() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
        <h6>task11</h6>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
      Animated
      </button>

      {isOpen && <AnimatedModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
