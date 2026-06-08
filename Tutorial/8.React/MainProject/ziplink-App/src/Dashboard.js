// ─── Imports ─────────────────────────────────────────────
// React hooks for state, side effects, memoization
import { useState, useEffect, useCallback, useMemo } from 'react';
// For programmatic navigation after login/logout
import { useNavigate } from 'react-router-dom';
// API service — calls Shlink to create short URLs
import { shortenUrl } from './shlink';
// Utility helpers: clean title, extract domain, normalize URL, page size constant
import { cleanTitle, normalizeShortUrl, PER_PAGE } from './utils';
// Zustand stores — reactive auth session and link CRUD
import useAuthStore from './stores/authStore';
import useLinksStore from './stores/linksStore';
// All child UI components
import Navbar from './components/Navbar';
import AddLinkForm from './components/AddLinkForm';
import LinkTable from './components/LinkTable';
import Pagination from './components/Pagination';
import Sidebar from './components/Sidebar';
import QrModal from './components/QrModal';
import EditLinkModal from './components/EditLinkModal';
import ProModal from './components/ProModal';
import ConfirmModal from './components/ConfirmModal';
// Dashboard-specific styles (gradients, buttons, pagination, line spinner)
import './dashboard.css';

export default function Dashboard() {
  // ─── Router & Store Subscriptions ──────────────────────
  // navigate: redirect after logout
  const navigate = useNavigate();
  // Read auth state reactively — Dashboard re-renders on login/logout
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  // Read links state and CRUD actions from links store
  const links = useLinksStore((s) => s.links);
  const loadLinks = useLinksStore((s) => s.loadLinks);
  const addLink = useLinksStore((s) => s.addLink);
  const updateLink = useLinksStore((s) => s.updateLink);
  const deleteLink = useLinksStore((s) => s.deleteLink);

  // ─── Load Links on Mount / User Change ─────────────────
  // When Dashboard first loads or user changes, fetch that user's links from localStorage
  useEffect(() => {
    loadLinks(user?.email);
  }, [user?.email, loadLinks]);

  // ─── Logout Handler ────────────────────────────────────
  // Clears session from Zustand store and redirects to login page
  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  // ─── UI State Variables ─────────────────────────────────
  // All the working state Dashboard manages — passed down to child components as props
  const [url, setUrl] = useState('');              // Current URL in the input field
  const [qrLink, setQrLink] = useState(null);       // Link selected for QR modal popup
  const [preview, setPreview] = useState(null);     // Newly shortened link (preview mode)
  const [editLink, setEditLink] = useState(null);    // Link being edited (edit mode)
  const [loading, setLoading] = useState(false);     // Loading state for shorten button
  const [search, setSearch] = useState('');          // Search query text
  const [sort, setSort] = useState('newest');        // Sort order: newest or oldest
  const [page, setPage] = useState(1);               // Current pagination page
  const [showAll, setShowAll] = useState(false);      // Show all links toggle
  const [selectedLink, setSelectedLink] = useState(null);  // Currently selected table row
  const [showProModal, setShowProModal] = useState(false); // Pro upgrade modal visibility
  const [deleteTarget, setDeleteTarget] = useState(null);  // Link pending delete confirmation
  const [error, setError] = useState('');            // Error message for inline alert banner

  // ─── Reset Page on Search ─────────────────────────────
  // Whenever the user types in the search box, go back to page 1
  useEffect(() => { setPage(1); }, [search]);

  // ─── Filtered & Sorted Link List (Memoized) ────────────
  // Only recalculates when links, search, or sort changes
  // Not on every re-render — prevents performance issues while typing
  const filtered = useMemo(() =>
    links
      // Filter: matches title OR long URL (case-insensitive)
      .filter(l =>
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.long.toLowerCase().includes(search.toLowerCase())
      )
      // Sort: by date — newest first or oldest first
      .sort((a, b) =>
        sort === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
      ),
    [links, search, sort]
  );

  // ─── URL Shortening Handler ────────────────────────────
  // Core feature: calls Shlink API, shows preview, saves on confirm
  const handleShorten = useCallback(async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    // Check 5-link limit — only prodemo@gmail.com (Pro user) has unlimited
    if (user?.email !== 'prodemo@gmail.com' && links.length >= 5) {
      setShowProModal(true);  // Show upsell modal
      return;
    }
    setError('');        // Clear any previous error
    setLoading(true);    // Show spinner on button
    try {
      // Call Shlink API to create the short URL
      const data = await shortenUrl(url);
      // Clean the auto-fetched title (strip HTML tags, collapse whitespace)
      const title = cleanTitle(data.title) || new URL(url).hostname;
      // Set preview data — opens EditLinkModal in "preview" mode
      setPreview({ short: normalizeShortUrl(data.shortUrl), long: data.longUrl, title });
    } catch (err) {
      // Show error as inline banner instead of alert()
      setError('Failed to shorten: ' + err.message);
    } finally {
      setLoading(false);  // Hide spinner on button
    }
  }, [url, links.length, user?.email]);

  // ─── CRUD Handlers ─────────────────────────────────────
  // Confirm previewed link → save to store and clear input
  const handleConfirm = useCallback((item) => {
    addLink(item);
    setPreview(null);
    setUrl('');
  }, [addLink]);

  // Save edited link → update store
  const handleEdit = useCallback((updated) => {
    updateLink(updated);
    setEditLink(null);
  }, [updateLink]);

  // Initiate delete → show confirmation modal
  const handleDelete = useCallback((link) => {
    setDeleteTarget(link);
  }, []);

  // Confirm delete → remove from store
  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    deleteLink(deleteTarget.short);
    setDeleteTarget(null);
  }, [deleteTarget, deleteLink]);

  // Cancel delete → dismiss modal
  const cancelDelete = useCallback(() => setDeleteTarget(null), []);

  // ─── Modal Close Handlers ───────────────────────────────
  const closeQr = useCallback(() => setQrLink(null), []);
  const closePreview = useCallback(() => setPreview(null), []);
  const closeEdit = useCallback(() => setEditLink(null), []);
  const closePro = useCallback(() => setShowProModal(false), []);

  // ─── Render ────────────────────────────────────────────
  return (
    // Clicking outside the table deselects the selected link
    <div className="bg-light min-vh-100 dashboard" onClick={() => setSelectedLink(null)}>
      {/* Modals — rendered conditionally based on state */}
      <QrModal link={qrLink} onClose={closeQr} />
      <EditLinkModal link={preview} onSave={handleConfirm} onCancel={closePreview} mode="preview" />
      <EditLinkModal link={editLink} onSave={handleEdit} onCancel={closeEdit} mode="edit" />
      {showProModal && <ProModal onClose={closePro} />}
      {deleteTarget && (
        <ConfirmModal
          title="Delete Link"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <Navbar onLogout={handleLogout} />

      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="row g-4">
          <div className="col-lg-8">
            {/* Error banner — shown when URL shortening fails */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 py-2" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{error}</span>
                <button type="button" className="btn-close ms-auto" onClick={() => setError('')}></button>
              </div>
            )}
            {/* URL input form */}
            <AddLinkForm url={url} setUrl={setUrl} loading={loading} onShorten={handleShorten} />

            {/* Search bar + sort dropdown */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="input-group" style={{ maxWidth: 280 }}>
                <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                <input className="form-control" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="form-select w-auto" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="newest">Descending</option>
                <option value="oldest">Ascending</option>
              </select>
            </div>

            {/* Link table — shows current page slice or all links */}
            <LinkTable
              visible={showAll ? filtered : filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)}
              selectedLink={selectedLink}
              onSelectLink={setSelectedLink}
              onQrClick={setQrLink}
              onEditClick={setEditLink}
              onDeleteClick={handleDelete}
            />

            {/* Pagination controls */}
            <Pagination
              filtered={filtered}
              page={page}
              setPage={setPage}
              showAll={showAll}
              setShowAll={setShowAll}
              PER_PAGE={PER_PAGE}
            />
          </div>

          {/* Right sidebar — total links count + QR code preview */}
          <Sidebar selectedLink={selectedLink} />
        </div>
      </div>
    </div>
  );
}
