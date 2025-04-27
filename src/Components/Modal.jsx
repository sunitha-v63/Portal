import React from "react"; 
import ReactDOM from "react-dom"; 
 
const Modal = ({ message, onClose }) => { 
  return ReactDOM.createPortal( 
    <div style={modalStyle}> 
      <p>{message}</p> 
      <button onClick={onClose}>Close</button> 
    </div>, 
    document.getElementById("modal-root") 
  ); 
}; 
 
const modalStyle = { 
  position: "fixed", 
  top: "50%", 
  left: "50%", 
  transform: "translate(-50%, -50%)", 
  background: "blue", 
  color:"white",
  padding: "20px", 
  boxShadow: "0px 0px 10px rgba(0,0,0,0.3)", 
  zIndex: 1000 
}; 
 
export default Modal; 