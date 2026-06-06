import { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logoutMsg, setLogoutMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    console.log('Login:', { email, password });
  }

  return (
    <>
      <nav className="navbar-custom">
        <div className="brand">
          <div className="brand-icon">
            <i className="bi bi-link-45deg"></i>
          </div>
          <Link to="/" className="brand-name">Ziplink</Link>
        </div>
        <div className="nav-links">
        </div>
      </nav>
      <div className="page-container">
        <div className="auth-card">
          <h2 className="auth-title">Welcome Back</h2>
          <div className="auth-switch">
            <Link to="/login" className="active">Login</Link>
            <Link to="/register">Signup</Link>
          </div>
          {error && <div className="message">{error}</div>}
          {logoutMsg && <div className="message" style={{ background: '#d4edda', color: '#155724', borderColor: '#c3e6cb' }}>{logoutMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-auth">Login</button>
          </form>
          <div className="bottom-text">
            Not a member? <Link to="/register">Signup now</Link>
          </div>
        </div>
      </div>
    </>
  );
}
