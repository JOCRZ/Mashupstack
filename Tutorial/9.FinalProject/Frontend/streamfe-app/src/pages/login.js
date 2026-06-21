import { Link } from "react-router-dom";
import "./auth.css";

function Login() {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#2596be">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue watching</p>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control auth-input" placeholder="Enter your email" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control auth-input" placeholder="Enter your password" />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
            <button type="button" className="auth-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>Forgot Password?</button>
          </div>

          <button type="submit" className="btn auth-btn w-100">Login</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
