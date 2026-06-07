import ModalWrapper from './ModalWrapper';

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <ModalWrapper onClose={onCancel}>
      <h5 className="mb-3">{title}</h5>
      <p className="text-muted mb-4">{message}</p>
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
      </div>
    </ModalWrapper>
  );
}
