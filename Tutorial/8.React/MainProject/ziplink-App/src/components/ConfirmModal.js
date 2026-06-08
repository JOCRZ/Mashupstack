// ─── Confirm Modal Component ────────────────────────────
// Delete confirmation dialog
// Shows link title in message, Cancel and Delete buttons

import ModalWrapper from './ModalWrapper';

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    // ModalWrapper handles Escape key + backdrop click — both trigger cancel
    <ModalWrapper onClose={onCancel}>
      {/* ─── Title ─────────────────────────────────────── */}
      <h5 className="mb-3">{title}</h5>

      {/* ─── Message ───────────────────────────────────── */}
      <p className="text-muted mb-4">{message}</p>

      {/* ─── Actions ───────────────────────────────────── */}
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
      </div>
    </ModalWrapper>
  );
}
