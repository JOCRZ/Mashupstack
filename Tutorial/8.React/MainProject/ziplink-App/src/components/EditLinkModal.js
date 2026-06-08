// ─── Edit Link Modal Component ──────────────────────────
// Dual-purpose modal:
//   Preview mode (after shortening) — green Save button
//   Edit mode (pencil icon) — blue Save button
// Pre-fills inputs with link data, allows editing title and URL

import { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';

export default function EditLinkModal({ link, onSave, onCancel, mode }) {
  // ─── Local State ───────────────────────────────────────
  const [title, setTitle] = useState('');
  const [longUrl, setLongUrl] = useState('');

  // ─── Sync with Link Data ──────────────────────────────
  // When link prop changes, update form fields
  useEffect(() => {
    if (link) { setTitle(link.title); setLongUrl(link.long); }
  }, [link]);

  // ─── Null Guard ───────────────────────────────────────
  if (!link) return null;

  const isPreview = mode === 'preview';

  return (
    <ModalWrapper onClose={onCancel}>
      {/* ─── Header ────────────────────────────────────── */}
      {/* Different title based on mode */}
      <h5 className="mb-3">{isPreview ? 'Preview' : 'Edit Link'}</h5>

      {/* ─── Title Field ───────────────────────────────── */}
      <div className="mb-3">
        <label className="form-label small text-muted">Title</label>
        <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      {/* ─── URL Field ─────────────────────────────────── */}
      <div className="mb-3">
        <label className="form-label small text-muted">Original URL</label>
        <input className="form-control" value={longUrl} onChange={e => setLongUrl(e.target.value)} />
      </div>

      {/* ─── Action Buttons ────────────────────────────── */}
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        {/* Preview mode: green Save. Edit mode: blue Save. */}
        <button className={`btn ${isPreview ? 'btn-success' : 'btn-primary'}`} onClick={() => onSave({ ...link, title, long: longUrl })}>Save</button>
      </div>
    </ModalWrapper>
  );
}
