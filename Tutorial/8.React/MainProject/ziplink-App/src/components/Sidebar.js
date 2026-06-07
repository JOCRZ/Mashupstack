import { useState } from 'react';
import { extractDomain } from '../utils';
import useLinksStore from '../stores/linksStore';

export default function Sidebar({ selectedLink }) {
  const links = useLinksStore((s) => s.links);
  const [qrLoading, setQrLoading] = useState(true);

  return (
    <div className="col-lg-4">
      <div className="card shadow-sm border-0 rounded-3 text-center py-3 px-4">
        <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto icon-violet-bg" style={{ width: 44, height: 44 }}>
          <i className="bi bi-link-45deg" style={{ color: '#7C3AED' }}></i>
        </div>
        <h3 className="fw-bold mt-2 mb-0" style={{ color: '#3B0764' }}>{links.length}</h3>
        <p className="text-muted mb-0 small">Total Links</p>
      </div>

      <div className="card shadow-sm border-0 rounded-3 text-center p-4 mt-3" style={{ minHeight: 280 }}>
        <h6 className="text-muted mb-3">QR Code</h6>
        {selectedLink ? (
          <>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <img
                src={`https://www.google.com/s2/favicons?domain=${extractDomain(selectedLink.long)}&sz=32`}
                alt=""
                width="20" height="20"
                onError={e => e.target.style.display = 'none'}
              />
              <span className="small fw-semibold text-truncate" style={{ maxWidth: 200 }}>{selectedLink.title}</span>
            </div>
            <div className="d-flex justify-content-center" style={{ position: 'relative', minHeight: 150 }}>
              {qrLoading && (
                <div className="d-flex align-items-center justify-content-center" style={{ position: 'absolute', inset: 0 }}>
                  <svg width="100" height="100" viewBox="0 0 100 100" className="qr-skeleton">
                    <rect x="5" y="5" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="27" y="5" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="49" y="5" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="5" y="27" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="49" y="27" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="5" y="49" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="27" y="49" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="49" y="49" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="71" y="5" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="71" y="27" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="71" y="49" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="5" y="71" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="27" y="71" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="49" y="71" width="18" height="18" rx="2" fill="#7C3AED" />
                    <rect x="71" y="71" width="18" height="18" rx="2" fill="#7C3AED" />
                  </svg>
                </div>
              )}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(selectedLink.short)}`}
                alt="QR"
                style={{ width: 150, height: 150 }}
                onLoad={() => setQrLoading(false)}
                onError={() => setQrLoading(false)}
              />
            </div>
            <p className="small text-muted mt-2 mb-0 text-break">{selectedLink.short}</p>
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 190 }}>
            <p className="text-muted small mb-0">Click a link to show QR</p>
          </div>
        )}
      </div>
    </div>
  );
}
