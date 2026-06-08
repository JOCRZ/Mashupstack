// ─── QR Modal Component ──────────────────────────────────
// Full-screen QR code popup triggered by QR button in table
// Shows line-spinner while image loads from external API

import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

export default function QrModal({ link, onClose }) {
  const [loaded, setLoaded] = useState(false);

  // ─── Null Guard ───────────────────────────────────────
  // Don't render anything if no link is selected
  if (!link) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center">
        {/* ─── Loading Spinner ─────────────────────────── */}
        {/* Visible while QR image is loading */}
        {!loaded && (
          <div className="mx-auto" style={{ width: '80%', maxWidth: 200, paddingTop: 100 }}>
            <div className="line-spinner"></div>
          </div>
        )}

        {/* ─── QR Image ────────────────────────────────── */}
        {/* 200x200 QR code from api.qrserver.com; hidden via d-none until loaded */}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link.short)}`}
          alt="QR Code"
          className={`mx-auto ${loaded ? '' : 'd-none'}`}
          style={{ width: 200, height: 200 }}
          onLoad={() => setLoaded(true)}
        />

        {/* Short URL text */}
        <p className="text-muted small mt-2 mb-3 text-break">{link.short}</p>

        {/* Close button */}
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </ModalWrapper>
  );
}
