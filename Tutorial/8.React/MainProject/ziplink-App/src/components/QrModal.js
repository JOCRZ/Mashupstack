import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

export default function QrModal({ link, onClose }) {
  const [loaded, setLoaded] = useState(false);
  if (!link) return null;
  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center">
        {!loaded && (
          <div className="d-flex justify-content-center align-items-center mx-auto" style={{ width: 200, height: 200 }}>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link.short)}`}
          alt="QR Code"
          className={`mx-auto ${loaded ? '' : 'd-none'}`}
          style={{ width: 200, height: 200 }}
          onLoad={() => setLoaded(true)}
        />
        <p className="text-muted small mt-2 mb-3 text-break">{link.short}</p>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </ModalWrapper>
  );
}
