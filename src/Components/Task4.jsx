import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">This is a Modal</h2>
        <p>Click outside to close it.</p>
      </div>
    </div>,
    document.body
  );
}

export default function Task4() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
        <h6>task6</h6>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
       click
      </button>

      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
