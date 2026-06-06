import { useState, useEffect } from 'react';
import { shortenUrl } from './shlink';

function cleanTitle(title) {
  if (!title) return null;
  return title
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[-|]/g, '–')
    .trim();
}

function QrModal({ link, onClose }) {
  const [loaded, setLoaded] = useState(false);
  if (!link) return null;
  return (
    <div className="modal d-block" tabIndex="-1" onClick={onClose} style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content p-4 text-center">
          {!loaded && (
            <div className="d-flex justify-content-center align-items-center" style={{ width: 200, height: 200, margin: '0 auto' }}>
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
          <p className="text-muted small mt-2 mb-3" style={{ wordBreak: 'break-all' }}>{link.short}</p>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({ preview, onConfirm, onCancel }) {
  const [title, setTitle] = useState('');
  const [longUrl, setLongUrl] = useState('');
  useEffect(() => {
    if (preview) {
      setTitle(preview.title);
      setLongUrl(preview.long);
    }
  }, [preview]);
  if (!preview) return null;
  return (
    <div className="modal d-block" tabIndex="-1" onClick={onCancel} style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content p-4">
          <h5 className="mb-3">Preview</h5>
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
            <button className="btn btn-success" onClick={() => onConfirm({ ...preview, title, long: longUrl })}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditModal({ link, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [longUrl, setLongUrl] = useState('');
  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setLongUrl(link.long);
    }
  }, [link]);
  if (!link) return null;
  return (
    <div className="modal d-block" tabIndex="-1" onClick={onCancel} style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content p-4">
          <h5 className="mb-3">Edit Link</h5>
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
            <button className="btn btn-primary" onClick={() => onSave({ ...link, title, long: longUrl })}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const PER_PAGE = 2;
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('shlink_links');
    return saved ? JSON.parse(saved) : [];
  });
  const [qrLink, setQrLink] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editLink, setEditLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    localStorage.setItem('shlink_links', JSON.stringify(links));
  }, [links]);

  const filtered = links.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.long.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = showAll ? filtered : filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    localStorage.setItem('shlink_links', JSON.stringify(links));
  }, [links]);

  async function handleShorten(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await shortenUrl(url);
      const title = cleanTitle(data.title) || new URL(url).hostname;
      setPreview({ short: data.shortUrl, long: data.longUrl, title });
    } catch (err) {
      alert('Failed to shorten: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { setPage(1); }, [search]);

  function handleConfirm(item) {
    setLinks(prev => [{ ...item, date: new Date().toISOString() }, ...prev]);
    setPreview(null);
    setUrl('');
  }

  function handleEdit(updated) {
    setLinks(prev => prev.map(l => l.short === updated.short ? updated : l));
    setEditLink(null);
  }

  function handleDelete(short) {
    setLinks(prev => prev.filter(l => l.short !== short));
  }

  return (
    <div className="container py-4" style={{ maxWidth: 640 }}>
      <QrModal link={qrLink} onClose={() => setQrLink(null)} />
      <PreviewModal preview={preview} onConfirm={handleConfirm} onCancel={() => setPreview(null)} />
      <EditModal link={editLink} onSave={handleEdit} onCancel={() => setEditLink(null)} />
      <h1 className="mb-4">Ziplink</h1>
      <form onSubmit={handleShorten} className="d-flex gap-2 mb-4">
        <input
          type="url"
          className="form-control"
          placeholder="Paste a long URL..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>
      <input
        className="form-control mb-3"
        placeholder="Search links..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <h5 className="mb-3">Links</h5>
      <div style={{ minHeight: 280 }}>
        {visible.length === 0 && <p className="text-muted">No links found.</p>}
        <ul className="list-unstyled">
        {visible.map((link, i) => (
          <li key={i} className="border rounded p-3 mb-3 position-relative" style={{ minHeight: 90 }}>
            <button className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 mt-2 me-2" onClick={() => setQrLink(link)}>QR</button>
            <div className="fw-semibold mb-1 pe-5">{link.title}</div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <a href={link.short} target="_blank" rel="noreferrer">{link.short}</a>
            </div>
            <div className="small text-muted text-truncate pe-5">{link.long}</div>
            <div className="position-absolute bottom-0 end-0 mb-2 me-2 d-flex gap-1">
              <button className="btn btn-sm btn-outline-primary" onClick={() => setEditLink(link)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(link.short)}>Delete</button>
            </div>
          </li>
        ))}
        </ul>
      </div>
      {filtered.length > PER_PAGE && (
        showAll ? (
          <div className="text-end mt-3">
            <button className="btn btn-sm btn-outline-info" onClick={() => { setShowAll(false); setPage(1); }}>Paginate</button>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between mt-3">
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => p - 1)}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setPage(p)}>{p}</button>
                  </li>
                ))}
                <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => p + 1)}>Next</button>
                </li>
              </ul>
            </nav>
            <button className="btn btn-sm btn-outline-info" onClick={() => setShowAll(true)}>Show All</button>
          </div>
        )
      )}
    </div>
  );
}

export default App;