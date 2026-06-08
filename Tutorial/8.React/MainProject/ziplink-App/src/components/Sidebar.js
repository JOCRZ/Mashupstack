// ─── Sidebar Component ───────────────────────────────────
// Right panel showing total link count and QR code preview for selected link
// Reads links store directly for the count (no prop drilling)

import { useState } from 'react';
import { extractDomain } from '../utils';
import useLinksStore from '../stores/linksStore';

export default function Sidebar({ selectedLink }) {
  // ─── Store & State ────────────────────────────────────
  // Read total link count directly from store (no need for Dashboard to pass it)
  const links = useLinksStore((s) => s.links);
  const [qrLoading, setQrLoading] = useState(true);

  return (
    <div className="col-lg-4">
      {/* ─── Total Links Card ──────────────────────────── */}
      <div className="card shadow-sm border-0 rounded-3 text-center py-3 px-4">
        <h3 className="fw-bold mb-0" style={{ color: '#3B0764' }}>{links.length}</h3>
        <p className="text-muted mb-0 small">Total Links</p>
      </div>

      {/* ─── QR Code Card ──────────────────────────────── */}
      <div className="card shadow-sm border-0 rounded-3 text-center p-4" style={{ marginTop: '3rem', minHeight: 280 }}>
        <h6 className="text-muted mb-3">QR Code</h6>
        {selectedLink ? (
          <>
            {/* Selected link info: favicon + title */}
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <img
                src={`https://www.google.com/s2/favicons?domain=${extractDomain(selectedLink.long)}&sz=32`}
                alt=""
                width="20" height="20"
                onError={e => e.target.style.display = 'none'}
              />
              <span className="small fw-semibold text-truncate" style={{ maxWidth: 200 }}>{selectedLink.title}</span>
            </div>

            {/* QR image with line-spinner loading indicator */}
            <div className="d-flex justify-content-center" style={{ position: 'relative', minHeight: 150 }}>
              {/* Loading spinner — visible while image loads */}
              {qrLoading && (
                <div className="d-flex align-items-center justify-content-center" style={{ position: 'absolute', inset: 0 }}>
                  <div style={{ width: 120 }}><div className="line-spinner"></div></div>
                </div>
              )}
              {/* QR code image from api.qrserver.com */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(selectedLink.short)}`}
                alt="QR"
                style={{ width: 150, height: 150 }}
                onLoad={() => setQrLoading(false)}
                onError={() => setQrLoading(false)}
              />
            </div>

            {/* Short URL text below QR */}
            <p className="small text-muted mt-2 mb-0 text-break">{selectedLink.short}</p>
          </>
        ) : (
          // ─── Empty State ─────────────────────────────
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 190 }}>
            <p className="text-muted small mb-0">Click a link to show QR</p>
          </div>
        )}
      </div>
    </div>
  );
}
