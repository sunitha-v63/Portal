import { useState } from "react";
import { withPortal } from "./withPortal"; // adjust path if needed

function SimpleModal({ message }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Portal Modal</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

const PortalModal = withPortal(SimpleModal);

export default function Task9() {
  const [show, setShow] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
        <h6>task12,13</h6>
      <button
        onClick={() => setShow(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      {show && (
        <PortalModal message="Hello from Portal!" />
      )}
    </div>
  );
}
