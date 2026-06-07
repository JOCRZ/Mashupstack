import useAuthStore from '../stores/authStore';

export default function Navbar({ onLogout }) {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-white shadow mb-4" style={{ borderBottom: '2px solid #7C3AED' }}>
      <div className="container d-flex justify-content-between align-items-center py-3" style={{ maxWidth: 1100 }}>
        <div className="d-flex align-items-center gap-2">
          <div className="icon-violet d-flex align-items-center justify-content-center rounded" style={{ width: 38, height: 38 }}>
            <i className="bi bi-link-45deg fs-5"></i>
          </div>
          <h4 className="mb-0 fw-bold" style={{ color: '#3B0764' }}>Ziplink</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted" style={{ fontSize: 14 }}>
            Hi, {user?.email?.split('@')[0] || 'User'}
            {user?.email === 'prodemo@gmail.com' && <i className="bi bi-crown-fill ms-1" style={{ color: '#F59E0B' }}></i>}
          </span>
          <div className="dropdown">
            <button className="btn p-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="icon-violet d-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style={{ width: 32, height: 32, fontSize: 14, cursor: 'pointer' }}>
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
