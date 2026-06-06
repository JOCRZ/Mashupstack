import { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  function Validate() {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!Validate()) return;
    console.log('Register:', { email, password });
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
          <h2 className="auth-title">Create Account</h2>
          <div className="auth-switch">
            <Link to="/login">Login</Link>
            <Link to="/register" className="active">Signup</Link>
          </div>
          {message && <div className="message" style={{ background: '#d4edda', color: '#155724', borderColor: '#c3e6cb' }}>{message}</div>}
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
                id="password"
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
                id="confirmPassword"
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
