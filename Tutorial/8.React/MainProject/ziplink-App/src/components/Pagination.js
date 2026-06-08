export default function Pagination({ filtered, page, setPage, showAll, setShowAll, PER_PAGE }) {
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const from = (page - 1) * PER_PAGE + 1;
  const to = Math.min(page * PER_PAGE, filtered.length);

  if (filtered.length <= PER_PAGE) return null;

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pb-2" style={{ marginTop: '1rem' }}>
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
  );
}
