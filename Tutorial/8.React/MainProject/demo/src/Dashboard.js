// Main dashboard — URL shortener UI with create, list, search, sort, paginate, edit, delete, QR codes

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shortenUrl } from './shlink';
import { getCurrentUser, getLinksKey, logoutUser } from './auth';
import './dashboard.css';

// ---------- helpers ----------

function cleanTitle(title) {
  if (!title) return null;
  return title
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[-|]/g, '–')
    .trim();
}

function extractDomain(url) {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return ''; }
}

// ---------- modal sub-components ----------

// Large QR popup shown when clicking the QR action button in a table row
function QrModal({ link, onClose }) {
  const [loaded, setLoaded] = useState(false);
  if (!link) return null;
  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal d-block" tabIndex="-1" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content p-4 text-center">
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
        </div>
      </div>
    </>
  );
}

// Preview shown after API shortening — lets user edit title/URL before saving
function PreviewModal({ preview, onConfirm, onCancel }) {
  const [title, setTitle] = useState('');
  const [longUrl, setLongUrl] = useState('');
  useEffect(() => {
    if (preview) { setTitle(preview.title); setLongUrl(preview.long); }
  }, [preview]);
  if (!preview) return null;
  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal d-block" tabIndex="-1" onClick={onCancel}>
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
    </>
  );
}

// Edit modal for an already-saved link (same layout as PreviewModal)
function EditModal({ link, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [longUrl, setLongUrl] = useState('');
  useEffect(() => {
    if (link) { setTitle(link.title); setLongUrl(link.long); }
  }, [link]);
  if (!link) return null;
  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal d-block" tabIndex="-1" onClick={onCancel}>
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
    </>
  );
}

// ---------- main Dashboard component ----------

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const linksKey = getLinksKey(user?.email || 'default');

  function handleLogout() {
    logoutUser();
    navigate('/login');
  }

  const PER_PAGE = 3;
  const SHORT_BASE = 'http://192.168.1.15:8080';

  // Normalize short URLs to always use SHORT_BASE (handles old ziplink-format URLs)
  function normalizeShortUrl(url) {
    try {
      const u = new URL(url);
      return `${SHORT_BASE}/${u.pathname.replace(/^\//, '')}`;
    } catch { return url; }
  }

  const [url, setUrl] = useState('');
  // Load links from localStorage on mount, normalizing existing URLs
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem(linksKey);
    return saved ? JSON.parse(saved).map(l => ({ ...l, short: normalizeShortUrl(l.short) })) : [];
  });
  const [qrLink, setQrLink] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editLink, setEditLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [showProModal, setShowProModal] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);

  // Persist links to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(linksKey, JSON.stringify(links));
  }, [links, linksKey]);

  // Reset QR skeleton animation when a different link is selected
  useEffect(() => { setQrLoading(true); }, [selectedLink]);

  const filtered = links
    .filter(l =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.long.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = showAll ? filtered : filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset to page 1 whenever search text changes
  useEffect(() => { setPage(1); }, [search]);

  // Call Shlink API to shorten, then open preview modal
  async function handleShorten(e) {
    e.preventDefault();
    // Pro user has unlimited links; everyone else is capped at 5
    if (user?.email !== 'prodemo@gmail.com' && links.length >= 5) {
      setShowProModal(true);
      return;
    }
    setLoading(true);
    try {
      const data = await shortenUrl(url);
      const title = cleanTitle(data.title) || new URL(url).hostname;
      setPreview({ short: normalizeShortUrl(data.shortUrl), long: data.longUrl, title });
    } catch (err) {
      alert('Failed to shorten: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Confirm the previewed link and save it to the list
  function handleConfirm(item) {
    setLinks(prev => [{ ...item, date: new Date().toISOString() }, ...prev]);
    setPreview(null);
    setUrl('');
  }

  // Save edits to an existing link
  function handleEdit(updated) {
    setLinks(prev => prev.map(l => l.short === updated.short ? updated : l));
    setEditLink(null);
  }

  // Delete a link from the list
  function handleDelete(short) {
    setLinks(prev => prev.filter(l => l.short !== short));
  }

  // Pagination display range
  const from = (page - 1) * PER_PAGE + 1;
  const to = Math.min(page * PER_PAGE, filtered.length);

  return (
    <div className="bg-light min-vh-100 dashboard" onClick={() => setSelectedLink(null)}>
      {/* modals */}
      <QrModal link={qrLink} onClose={() => setQrLink(null)} />
      <PreviewModal preview={preview} onConfirm={handleConfirm} onCancel={() => setPreview(null)} />
      <EditModal link={editLink} onSave={handleEdit} onCancel={() => setEditLink(null)} />
      {showProModal && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal d-block" tabIndex="-1" onClick={() => setShowProModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
              <div className="modal-content p-4 text-center">
                <div className="icon-violet-bg d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3" style={{ width: 56, height: 56 }}>
                  <i className="bi bi-stars fs-3" style={{ color: '#7C3AED' }}></i>
                </div>
                <h5 className="fw-bold mb-1">Upgrade to Pro</h5>
                <p className="text-muted small mb-3">You've reached the 5-link limit. Subscribe to Pro for unlimited links.</p>
                <button className="btn btn-violet w-100 mb-2">Subscribe Now — $4.99/mo</button>
                <button className="btn btn-sm text-muted" onClick={() => setShowProModal(false)}>Maybe later</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* navbar */}
      <div className="bg-white shadow" style={{ borderBottom: '2px solid #7C3AED' }}>
        <div className="container d-flex justify-content-between align-items-center py-3" style={{ maxWidth: 1100 }}>
          <div className="d-flex align-items-center gap-2">
            <div className="icon-violet d-flex align-items-center justify-content-center rounded" style={{ width: 38, height: 38 }}>
              <i className="bi bi-link-45deg fs-5"></i>
            </div>
            <h4 className="mb-0 fw-bold" style={{ color: '#3B0764' }}>Ziplink</h4>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted" style={{ fontSize: 14 }}>Hi, {user?.email?.split('@')[0] || 'User'}{user?.email === 'prodemo@gmail.com' && <i className="bi bi-crown-fill ms-1" style={{ color: '#F59E0B' }}></i>}</span>
            <div className="dropdown">
              <button className="btn p-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="icon-violet d-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style={{ width: 32, height: 32, fontSize: 14, cursor: 'pointer' }}>{user?.email?.charAt(0).toUpperCase() || 'U'}</div>
              </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3" style={{ minWidth: 200 }}>
              <li><span className="dropdown-item-text small text-muted">{user?.email}</span></li>
              <li><span className="dropdown-item-text small fw-semibold" style={{ color: user?.email === 'prodemo@gmail.com' ? '#7C3AED' : '#6B7280' }}>{user?.email === 'prodemo@gmail.com' ? 'Pro Plan' : 'Basic Plan'}</span></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
            </ul>
            </div>
          </div>
      </div>

      {/* main content */}
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="row g-4">
          <div className="col-lg-8">

            {/* add-link form */}
            <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-body d-flex align-items-center gap-3 p-3">
                <div className="icon-violet-bg d-flex align-items-center justify-content-center rounded" style={{ width: 40, height: 40, minWidth: 40 }}>
                  <i className="bi bi-link-45deg fs-5"></i>
                </div>
                <form onSubmit={handleShorten} className="d-flex gap-2 flex-grow-1">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter URL (e.g. https://example.com)"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    required
                  />
                  {url && (
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setUrl('')} title="Clear">
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                  <button type="submit" className="btn btn-violet text-nowrap" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm" role="status"></span> : '+ Add Link'}
                  </button>
                </form>
              </div>
            </div>

            {/* search & sort bar */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="input-group" style={{ maxWidth: 280 }}>
                <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                <input className="form-control" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="form-select w-auto" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* links table */}
            <div className="card shadow-sm border-0 rounded-3" style={{ minHeight: 260 }}>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '40%' }}>Title</th>
                      <th style={{ width: '25%' }}>Short Link</th>
                      <th style={{ width: '20%' }}>Added On</th>
                      <th style={{ width: '15%' }} className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.length === 0 && (
                      <tr><td colSpan="4" className="text-center text-muted py-4">No links found.</td></tr>
                    )}
                    {visible.map((link, i) => (
                      <tr key={i} onClick={e => { e.stopPropagation(); setSelectedLink(link); }} role="button" className={selectedLink?.short === link.short ? 'table-primary' : ''}>
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
                        <td>
                          <a href={link.short} target="_blank" rel="noreferrer" className="text-primary small text-break">{link.short}</a>
                        </td>
                        <td className="small text-muted">{new Date(link.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                        <td>
                          <div className="d-flex gap-1 justify-content-end">
                            <button className="btn btn-sm btn-outline-secondary border-0" title="QR" onClick={() => setQrLink(link)}><i className="bi bi-qr-code"></i></button>
                            <button className="btn btn-sm btn-outline-secondary border-0" title="Edit" onClick={() => setEditLink(link)}><i className="bi bi-pencil"></i></button>
                            <button className="btn btn-sm btn-outline-danger border-0" title="Delete" onClick={() => handleDelete(link.short)}><i className="bi bi-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* pagination */}
            {filtered.length > PER_PAGE && (
              <div className="d-flex flex-wrap align-items-center justify-content-between mt-3 gap-2 pb-2">
                <small className="text-muted">
                  {showAll ? `Showing all ${filtered.length} links` : `Showing ${from} to ${to} of ${filtered.length} links`}
                </small>
                {showAll ? (
                  <button className="btn btn-sm btn-outline-violet" onClick={() => { setShowAll(false); setPage(1); }}>Paginate</button>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-outline-violet" onClick={() => setShowAll(true)}>Show All</button>
                    <nav className="overflow-auto">
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
                  </div>
                )}
              </div>
            )}
          </div>

          {/* sidebar */}
          <div className="col-lg-4">

            {/* total links card */}
            <div className="card shadow-sm border-0 rounded-3 text-center py-3 px-4">
              <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto icon-violet-bg" style={{ width: 44, height: 44 }}>
                <i className="bi bi-link-45deg" style={{ color: '#7C3AED' }}></i>
              </div>
              <h3 className="fw-bold mt-2 mb-0" style={{ color: '#3B0764' }}>{links.length}</h3>
              <p className="text-muted mb-0 small">Total Links</p>
            </div>

            {/* QR code card — shows a skeleton loader while the image loads */}
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
        </div>
      </div>
    </div>
    </div>
  );
}
