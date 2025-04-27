import { createPortal } from "react-dom";

// HOC: Takes a Component and returns a new component that renders in a portal
export function withPortal(WrappedComponent, target = document.body) {
  return function PortalizedComponent(props) {
    return createPortal(
      <WrappedComponent {...props} />,
      target
    );
  };
}
