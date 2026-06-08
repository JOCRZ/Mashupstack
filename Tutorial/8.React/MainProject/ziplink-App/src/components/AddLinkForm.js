// ─── Add Link Form Component ────────────────────────────
// URL input with clear button and submit button
// Shows spinner while shortening is in progress

export default function AddLinkForm({ url, setUrl, loading, onShorten }) {
  return (
    <div className="card shadow-sm border-0 rounded-3 mb-4">
      <div className="card-body d-flex align-items-center gap-3 p-3">
        {/* Link icon */}
        <div className="icon-violet-bg d-flex align-items-center justify-content-center rounded" style={{ width: 40, height: 40, minWidth: 40 }}>
          <i className="bi bi-link-45deg fs-5"></i>
        </div>

        {/* Input + buttons */}
        <form onSubmit={onShorten} className="d-flex gap-2 flex-grow-1">
          {/* URL input — type="url" triggers browser validation */}
          <input
            type="url"
            className="form-control"
            placeholder="Enter URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
          {/* Clear button — only visible when URL is entered */}
          {url && (
            <button type="button" className="btn btn-outline-secondary" onClick={() => setUrl('')} title="Clear">
              <i className="bi bi-x-lg"></i>
            </button>
          )}
          {/* Submit button — shows spinner when loading, disabled during request */}
          <button type="submit" className="btn btn-violet text-nowrap" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status"></span> : '+ Add Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
