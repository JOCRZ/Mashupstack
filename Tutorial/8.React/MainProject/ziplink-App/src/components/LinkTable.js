// ─── Link Table Component ────────────────────────────────
// Displays links in a table with favicon, title, short URL, date, and action buttons
// Supports: row selection, copy to clipboard, QR popup, edit, delete

import { useState } from 'react';
import { extractDomain } from '../utils';

export default function LinkTable({ visible, selectedLink, onSelectLink, onQrClick, onEditClick, onDeleteClick }) {
  // ─── Copy-to-Clipboard State ──────────────────────────
  // Tracks which link's "Copied!" feedback is currently showing
  const [copiedId, setCopiedId] = useState(null);

  // ─── Copy Handler ─────────────────────────────────────
  // Uses Clipboard API, shows "Copied!" for 1.5s then reverts
  async function handleCopy(short, id) {
    try {
      await navigator.clipboard.writeText(short);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  }

  return (
    <div className="card shadow-sm border-0 rounded-3" style={{ minHeight: 260 }}>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          {/* ─── Table Header ──────────────────────────── */}
          <thead className="table-light">
            <tr>
              <th style={{ width: '30%' }}>Title</th>
              <th style={{ width: '45%' }}>Short Link</th>
              <th style={{ width: '20%' }}>Added On</th>
              <th style={{ width: '15%' }} className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ─── Empty State ─────────────────────────── */}
            {visible.length === 0 && (
              <tr><td colSpan="4" className="text-center text-muted py-4">No links found.</td></tr>
            )}

            {/* ─── Link Rows ───────────────────────────── */}
            {visible.map(link => (
              <tr
                key={link.short}
                onClick={e => { e.stopPropagation(); onSelectLink(link); }}
                role="button"
                className={selectedLink?.short === link.short ? 'table-primary' : ''}
              >
                {/* Title column: favicon + truncated title + domain */}
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${extractDomain(link.long)}&sz=16`}
                      alt=""
                      width="16" height="16"
                      style={{ minWidth: 16 }}
                      onError={e => e.target.style.display = 'none'}
                    />
                    <div className="text-truncate">
                      <div className="fw-semibold small text-truncate" style={{ maxWidth: 220 }}>{link.title}</div>
                      <div className="small text-muted">{extractDomain(link.long)}</div>
                    </div>
                  </div>
                </td>

                {/* Short URL column: clickable link */}
                <td>
                  <a href={link.short} target="_blank" rel="noreferrer" className="text-primary small text-break">{link.short}</a>
                </td>

                {/* Date column: formatted to locale (e.g. "07 Jun 2026, 02:30 PM") */}
                <td className="small text-muted">
                  {new Date(link.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>

                {/* Actions column: Copy, QR, Edit, Delete */}
                <td>
                  <div className="d-flex gap-1 justify-content-end">
                    {/* Copy — shows "Copied!" text for 1.5s */}
                    <button className="btn btn-sm btn-outline-secondary border-0" title="Copy" onClick={() => handleCopy(link.short, link.short)}>
                      {copiedId === link.short ? <span style={{ fontSize: 11 }}>Copied!</span> : <i className="bi bi-clipboard"></i>}
                    </button>
                    {/* QR — opens full-screen QR modal */}
                    <button className="btn btn-sm btn-outline-secondary border-0" title="QR" onClick={() => onQrClick(link)}><i className="bi bi-qr-code"></i></button>
                    {/* Edit — opens edit modal */}
                    <button className="btn btn-sm btn-outline-secondary border-0" title="Edit" onClick={() => onEditClick(link)}><i className="bi bi-pencil"></i></button>
                    {/* Delete — opens confirmation dialog */}
                    <button className="btn btn-sm btn-outline-danger border-0" title="Delete" onClick={() => onDeleteClick(link)}><i className="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
