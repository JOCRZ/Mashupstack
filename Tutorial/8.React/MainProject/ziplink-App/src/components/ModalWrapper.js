// ─── Modal Wrapper Component ────────────────────────────
// Reusable modal shell that provides:
// - Bootstrap backdrop + dialog structure
// - Escape key to close (keyboard event listener)
// - Backdrop click to close (onClick on backdrop)
// - Stop propagation on dialog content (clicking inside doesn't close)

import { useEffect } from 'react';

export default function ModalWrapper({ children, onClose }) {
  // ─── Escape Key Handler ───────────────────────────────
  // Adds/removes keyboard listener on mount/unmount
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      {/* Semi-transparent backdrop — click to close */}
      <div className="modal-backdrop show" onClick={onClose}></div>
      {/* Modal container — click outside dialog closes */}
      <div className="modal d-block" tabIndex="-1" onClick={onClose}>
        {/* Centered dialog — stopPropagation prevents close on inside click */}
        <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
          <div className="modal-content p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
