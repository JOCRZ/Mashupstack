import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, email } = useSelector((state) => state.auth);
  const isLoggedIn = !!token;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#1a1a2e',
      color: '#fff',
      padding: '12px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{ fontWeight: 700, fontSize: 18 }}>Seller Dashboard</span>
      <div>
        {isLoggedIn ? (
          <>
            <span style={{ marginRight: 15 }}>{email}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '6px 16px',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" style={{ color: '#fff', marginRight: 15, textDecoration: 'none' }}>Login</a>
            <a href="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
