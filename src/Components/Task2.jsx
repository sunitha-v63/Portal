import React, { useState }  from 'react'
import Modal from './Modal';

function Task2() {
    const [showModal, setShowModal] = useState(false); 
  return (
    <>
    <h6>Task2,3,4</h6>
     <button onClick={() => setShowModal(true)}>Open Modal</button> 
      {showModal && <Modal message="Hello from Portal!" onClose={() => 
setShowModal(false)} />} 
    </>
  )
}

export default Task2