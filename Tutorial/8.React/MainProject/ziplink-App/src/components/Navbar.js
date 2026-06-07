import useAuthStore from '../stores/authStore';

export default function Navbar({ onLogout }) {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>
      <div className="container d-flex justify-content-between align-items-center py-3" style={{ maxWidth: 1100 }}>
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center rounded" style={{ width: 38, height: 38, background: '#fff' }}>
            <i className="bi bi-link-45deg fs-5" style={{ color: '#7C3AED' }}></i>
          </div>
          <h4 className="mb-0 fw-bold text-white">Ziplink</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
            Hi, {user?.email?.split('@')[0] || 'User'}
            {user?.email === 'prodemo@gmail.com' && <i className="bi bi-crown-fill ms-1" style={{ color: '#FDE047' }}></i>}
          </span>
          <div className="dropdown">
            <button className="btn p-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold" style={{ width: 32, height: 32, fontSize: 14, cursor: 'pointer', background: '#fff', color: '#7C3AED' }}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3" style={{ minWidth: 200 }}>
              <li><span className="dropdown-item-text small text-muted">{user?.email}</span></li>
              <li>
                <span className="dropdown-item-text small fw-semibold" style={{ color: user?.email === 'prodemo@gmail.com' ? '#7C3AED' : '#6B7280' }}>
                  {user?.email === 'prodemo@gmail.com' ? 'Pro Plan' : 'Basic Plan'}
                </span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={onLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
