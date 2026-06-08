// ─── Login Page ──────────────────────────────────────────
// Email/password login form with auth validation and session management

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { loginUser } from './auth';
import useAuthStore from './stores/authStore';
import logo from './images/zipllinklogo.png';

export default function Login() {
  // ─── Router & Store ────────────────────────────────────
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  // ─── Local State ───────────────────────────────────────
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ─── Submit Handler ────────────────────────────────────
  // Validates inputs, calls auth service, creates session on success
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const result = await loginUser(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    // Success: update Zustand store (persists to localStorage) and redirect
    login(email);
    navigate('/dashboard');
  }

  // ─── Render ────────────────────────────────────────────
  return (
    <>
      {/* Navbar with brand logo */}
      <nav className="navbar-custom">
        <div className="brand">
          <img src={logo} alt="Z" style={{ height: 28, width: 'auto' }} />
          <Link to="/login" className="brand-name" style={{ marginLeft: -6 }}>iplink</Link>
        </div>
        <div className="nav-links">
        </div>
      </nav>
      <div className="page-container">
        <div className="auth-card">
          <h2 className="auth-title">Welcome Back</h2>
          {/* Auth tab switcher — Login active, Signup link */}
          <div className="auth-switch">
            <Link to="/login" className="active">Login</Link>
            <Link to="/register">Signup</Link>
          </div>
          {/* Error message banner */}
          {error && <div className="message">{error}</div>}
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
