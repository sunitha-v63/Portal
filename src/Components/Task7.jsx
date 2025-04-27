import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function TooltipPortal({ targetRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0, visible: false });

  useEffect(() => {
    function updatePosition() {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top - 10,    // 10px above
          left: rect.left + rect.width / 2,
          visible: true
        });
      }
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [targetRef]);

  if (!position.visible) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -100%)",
        backgroundColor: "#333",
        color: "#fff",
        padding: "6px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

export default function Task7() {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef();

  return (
    <div className="h-screen flex items-center justify-center">
        <h6>task9,10</h6>
      <div className="relative">
        <button
          ref={buttonRef}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Hover Me
        </button>

        {showTooltip && (
          <TooltipPortal targetRef={buttonRef}>
            I am a Tooltip!
          </TooltipPortal>
        )}
      </div>
    </div>
  );
}
