import { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';

export default function EditLinkModal({ link, onSave, onCancel, mode }) {
  const [title, setTitle] = useState('');
  const [longUrl, setLongUrl] = useState('');
  useEffect(() => {
    if (link) { setTitle(link.title); setLongUrl(link.long); }
  }, [link]);
  if (!link) return null;
  const isPreview = mode === 'preview';
  return (
    <ModalWrapper onClose={onCancel}>
      <h5 className="mb-3">{isPreview ? 'Preview' : 'Edit Link'}</h5>
      <div className="mb-3">
        <label className="form-label small text-muted">Title</label>
        <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label small text-muted">Original URL</label>
        <input className="form-control" value={longUrl} onChange={e => setLongUrl(e.target.value)} />
      </div>
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className={`btn ${isPreview ? 'btn-success' : 'btn-primary'}`} onClick={() => onSave({ ...link, title, long: longUrl })}>Save</button>
      </div>
    </ModalWrapper>
  );
}
