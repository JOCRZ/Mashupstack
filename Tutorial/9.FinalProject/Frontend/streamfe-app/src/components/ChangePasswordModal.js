import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "";

function ChangePasswordModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const res = await fetch(`${API}/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const msg = await res.text();
      if (!res.ok) throw new Error(msg);
      setSuccess("Password changed successfully");
      setTimeout(() => {
        logout();
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.7)"
    }}>
      <div style={{
        background: "#1a1a1a", borderRadius: 12, padding: "28px 24px",
        width: 400, maxWidth: "90%", border: "1px solid #333"
      }}>
        <h3 style={{ color: "#fff", margin: "0 0 20px", fontSize: 18 }}>Change Password</h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="password" placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              padding: "10px 14px", borderRadius: 6, border: "1px solid #333",
              background: "#141414", color: "#fff", fontSize: 14, outline: "none"
            }}
          />
          <input
            type="password" placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              padding: "10px 14px", borderRadius: 6, border: "1px solid #333",
              background: "#141414", color: "#fff", fontSize: 14, outline: "none"
            }}
          />
          <input
            type="password" placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              padding: "10px 14px", borderRadius: 6, border: "1px solid #333",
              background: "#141414", color: "#fff", fontSize: 14, outline: "none"
            }}
          />

          {error && <p style={{ color: "#e04060", fontSize: 13, margin: 0 }}>{error}</p>}
          {success && <p style={{ color: "#4ade80", fontSize: 13, margin: 0 }}>{success}</p>}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
            <button type="button" onClick={onClose} style={{
              padding: "8px 20px", borderRadius: 6, border: "none",
              background: "#2a2a2a", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>
              Cancel
            </button>
            <button type="submit" style={{
              padding: "8px 20px", borderRadius: 6, border: "none",
              background: "#2596be", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer"
            }}>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
