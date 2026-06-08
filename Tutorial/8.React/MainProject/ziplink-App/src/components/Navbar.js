// ─── Navbar Component ────────────────────────────────────
// Top navigation bar with gradient background, brand logo,
// user greeting, and profile dropdown with logout

import useAuthStore from '../stores/authStore';
import logo from '../images/zipllinklogo.png';

export default function Navbar({ onLogout }) {
  // Read auth state reactively — updates on login/logout
  const user = useAuthStore((s) => s.user);

  return (
    // Violet-blue gradient bar
    <div className="shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>
      <div className="container d-flex justify-content-between align-items-center py-3" style={{ maxWidth: 1100 }}>
        {/* ─── Brand ──────────────────────────────────── */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="Z" style={{ height: 32, width: 'auto' }} />
          <h4 className="mb-0 fw-bold text-white" style={{ marginLeft: -6 }}>iplink</h4>
        </div>

        {/* ─── User Area ──────────────────────────────── */}
        <div className="d-flex align-items-center gap-2">
          {/* Greeting + Pro crown icon */}
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
            Hi, {user?.email?.split('@')[0] || 'User'}
            {user?.email === 'prodemo@gmail.com' && <i className="bi bi-crown-fill ms-1" style={{ color: '#FDE047' }}></i>}
          </span>

          {/* ─── Profile Dropdown ─────────────────────── */}
          <div className="dropdown">
            {/* Avatar circle with first letter of email */}
            <button className="btn p-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold" style={{ width: 32, height: 32, fontSize: 14, cursor: 'pointer', background: '#fff', color: '#7C3AED' }}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </button>
            {/* Dropdown menu: email, plan label, divider, logout */}
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
