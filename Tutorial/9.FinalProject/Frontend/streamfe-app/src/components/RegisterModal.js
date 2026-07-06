import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../pages/auth.css";

function RegisterModal({ isOpen, onClose, onSwitchToLogin, initialEmail }) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen && initialEmail) setEmail(initialEmail);
  }, [isOpen, initialEmail]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      onClose();
      onSwitchToLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div className="auth-card" style={{ margin: 0, padding: "24px 36px 28px" }} onClick={(e) => e.stopPropagation()}>
        <div className="auth-header" style={{ marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#2596be">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h2 style={{ fontSize: 20, margin: "10px 0 2px" }}>Create Account</h2>
          <p className="auth-subtitle">Join Stream Bucket today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control auth-input" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control auth-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Password</label>
              <input type="password" className="form-control auth-input" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control auth-input" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              {confirmPassword && password !== confirmPassword && (
                <div style={{ color: "#e04060", fontSize: 12, marginTop: 4 }}>
                  Passwords do not match
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-3" style={{ color: "#e04060", fontSize: 13, textAlign: "center" }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn auth-btn w-100" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <button onClick={() => { onClose(); onSwitchToLogin(); }} className="auth-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
