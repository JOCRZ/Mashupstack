// ─── Register Page ───────────────────────────────────────
// Email/password/confirm registration form with password-match validation

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { registerUser } from './auth';
import logo from './images/zipllinklogo.png';

export default function Register() {
  // ─── Router ────────────────────────────────────────────
  const navigate = useNavigate();

  // ─── Local State ───────────────────────────────────────
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ─── Submit Handler ────────────────────────────────────
  // Validates password match, calls register service,
  // shows success message then redirects to login after 1.5s
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const result = await registerUser(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMessage('Account created successfully!');
    setTimeout(() => navigate('/login'), 1500);
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
          <h2 className="auth-title">Create Account</h2>
          {/* Auth tab switcher — Login link, Signup active */}
          <div className="auth-switch">
            <Link to="/login">Login</Link>
            <Link to="/register" className="active">Signup</Link>
          </div>
          {/* Success message (green) */}
          {message && <div className="message" style={{ background: '#d4edda', color: '#155724', borderColor: '#c3e6cb' }}>{message}</div>}
          {/* Error message (red) */}
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
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-auth">Signup</button>
          </form>
          <div className="bottom-text">
            Already have an account? <Link to="/login">Login now</Link>
          </div>
        </div>
      </div>
    </>
  );
}
