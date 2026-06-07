import ModalWrapper from './ModalWrapper';

export default function ProModal({ onClose }) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center">
        <div className="icon-violet-bg d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3" style={{ width: 56, height: 56 }}>
          <i className="bi bi-stars fs-3" style={{ color: '#7C3AED' }}></i>
        </div>
        <h5 className="fw-bold mb-1">Upgrade to Pro</h5>
        <p className="text-muted small mb-3">You've reached the 5-link limit. Subscribe to Pro for unlimited links.</p>
        <button className="btn btn-violet w-100 mb-2">Subscribe Now — $4.99/mo</button>
        <button className="btn btn-sm text-muted" onClick={onClose}>Maybe later</button>
      </div>
    </ModalWrapper>
  );
}
