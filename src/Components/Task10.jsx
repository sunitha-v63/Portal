import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// Lightbox Component (portal)
function Lightbox({ imageUrl, onClose }) {
  const lightboxRef = useRef();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (lightboxRef.current && !lightboxRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div ref={lightboxRef} className="relative">
        <img src={imageUrl} alt="Enlarged" className="max-w-screen max-h-screen rounded-lg" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full px-3 py-1"
        >
          X
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function Task10() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "https://picsum.photos/id/1016/400/300"
  ];

  return (
    <div className="p-8 grid grid-cols-2 gap-4">
        <h6>mini project</h6>
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Gallery ${index}`}
          className="cursor-pointer rounded-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setSelectedImage(url)}
        />
      ))}

      {selectedImage && (
        <Lightbox
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
