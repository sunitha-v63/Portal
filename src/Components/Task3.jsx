import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function PortalComponent({ onClick }) {
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        width:"200px",
        bottom: "40%",
        right: "20px",
        background: "grey",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      Portal Component
    </div>,
    el
  );
}

function Task3() {
    const handleParentClick = () => {
        alert("Parent clicked!");
      };
    
      const handlePortalClick = () => {
        alert("Portal clicked!");
      };
    
      return (
        <>
        <h6>Task5</h6>
        <h3>Event Bubbling</h3>
        <div
          onClick={handleParentClick}
          style={{ padding: "5px", background: "grey" ,width:"200px"}}
        >
          <h2>Parent Component</h2>
          <PortalComponent onClick={handlePortalClick} />
        </div>
        </>
      );
    }

export default Task3