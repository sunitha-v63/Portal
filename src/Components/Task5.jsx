import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function NestedPortal({ children }) {
  return createPortal(
    <div className="absolute top-0 right-0 mt-2 mr-2 bg-yellow-200 p-2 rounded shadow">
      {children}
    </div>,
    document.body
  );
}

function Modal({ onClose }) {
  const modalRef = useRef();
  const [showTooltip, setShowTooltip] = useState(false);

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
      <div ref={modalRef} className="relative bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Main Modal</h2>
        <p>Click outside to close the modal.</p>

        <button 
          onClick={() => setShowTooltip((prev) => !prev)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Toggle Nested Tooltip
        </button>

        {showTooltip && (
          <NestedPortal>
            <div className="text-sm">I'm a nested portal tooltip!</div>
          </NestedPortal>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function Task5() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
        <h6>Task7</h6>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        on/off
      </button>

      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
