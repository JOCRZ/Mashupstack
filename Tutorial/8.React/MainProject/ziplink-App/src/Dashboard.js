import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { shortenUrl } from './shlink';
import { cleanTitle, normalizeShortUrl, PER_PAGE } from './utils';
import useAuthStore from './stores/authStore';
import useLinksStore from './stores/linksStore';
import Navbar from './components/Navbar';
import AddLinkForm from './components/AddLinkForm';
import LinkTable from './components/LinkTable';
import Pagination from './components/Pagination';
import Sidebar from './components/Sidebar';
import QrModal from './components/QrModal';
import EditLinkModal from './components/EditLinkModal';
import ProModal from './components/ProModal';
import ConfirmModal from './components/ConfirmModal';
import './dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const links = useLinksStore((s) => s.links);
  const loadLinks = useLinksStore((s) => s.loadLinks);
  const addLink = useLinksStore((s) => s.addLink);
  const updateLink = useLinksStore((s) => s.updateLink);
  const deleteLink = useLinksStore((s) => s.deleteLink);

  useEffect(() => {
    loadLinks(user?.email);
  }, [user?.email, loadLinks]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const [url, setUrl] = useState('');
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
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { setPage(1); }, [search]);

  const filtered = useMemo(() =>
    links
      .filter(l =>
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.long.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sort === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
      ),
    [links, search, sort]
  );

  const handleShorten = useCallback(async (e) => {
    e.preventDefault();
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
  }, [url, links.length, user?.email]);

  const handleConfirm = useCallback((item) => {
    addLink(item);
    setPreview(null);
    setUrl('');
  }, [addLink]);

  const handleEdit = useCallback((updated) => {
    updateLink(updated);
    setEditLink(null);
  }, [updateLink]);

  const handleDelete = useCallback((link) => {
    setDeleteTarget(link);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    deleteLink(deleteTarget.short);
    setDeleteTarget(null);
  }, [deleteTarget, deleteLink]);

  const cancelDelete = useCallback(() => setDeleteTarget(null), []);

  const closeQr = useCallback(() => setQrLink(null), []);
  const closePreview = useCallback(() => setPreview(null), []);
  const closeEdit = useCallback(() => setEditLink(null), []);
  const closePro = useCallback(() => setShowProModal(false), []);

  return (
    <div className="bg-light min-vh-100 dashboard" onClick={() => setSelectedLink(null)}>
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
            <AddLinkForm url={url} setUrl={setUrl} loading={loading} onShorten={handleShorten} />

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

            <LinkTable
              visible={showAll ? filtered : filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)}
              selectedLink={selectedLink}
              onSelectLink={setSelectedLink}
              onQrClick={setQrLink}
              onEditClick={setEditLink}
              onDeleteClick={handleDelete}
            />

            <Pagination
              filtered={filtered}
              page={page}
              setPage={setPage}
              showAll={showAll}
              setShowAll={setShowAll}
              PER_PAGE={PER_PAGE}
            />
          </div>

          <Sidebar selectedLink={selectedLink} />
        </div>
      </div>
    </div>
  );
}
