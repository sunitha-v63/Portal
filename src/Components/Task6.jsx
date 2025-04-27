import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function FormModal({ onClose, onSubmit }) {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Fill the Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default function Task6() {
  const [isOpen, setIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  function handleFormSubmit(data) {
    setSubmittedData(data);
    console.log("Form submitted:", data);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6">
        <h6>task8</h6>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Form
      </button>

      {isOpen && (
        <FormModal 
          onClose={() => setIsOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {submittedData && (
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold mb-2">Submitted Data:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}
