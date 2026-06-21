import { Link } from "react-router-dom";
import "./auth.css";

function Register() {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#2596be">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join Stream Bucket today</p>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control auth-input" placeholder="Enter your name" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control auth-input" placeholder="Enter your email" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control auth-input" placeholder="Create a password" />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control auth-input" placeholder="Confirm your password" />
          </div>

          <button type="submit" className="btn auth-btn w-100">Register</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
