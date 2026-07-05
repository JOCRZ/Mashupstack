import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "";

const statusLabels = {
  WATCHING: "Watching",
  PLAN_TO_WATCH: "Planned",
  HOLD: "On Hold",
  DROPPED: "Dropped",
  COMPLETED: "Watched"
};

function ProfileCard({ onClose, hideActions }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/profile`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/watchlist/counts`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch(() => {});
  }, [user]);

  const countMap = {};
  counts.forEach((c) => { countMap[c.status] = c.count; });

  return (
    <div style={{
      background: "#141414",
      border: "1px solid #2a2a2a",
      borderRadius: 12,
      padding: "28px 24px 20px",
      width: 280,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "3px solid #2596be",
        overflow: "hidden",
        marginBottom: 16
      }}>
        <img
          src="https://picsum.photos/seed/avatar/200/200"
          alt="Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <p style={{
        color: "#e0e0e0",
        fontSize: 16,
        fontWeight: 700,
        margin: "0 0 20px",
        textAlign: "center",
        wordBreak: "break-all"
      }}>
        {profile ? profile.name : "Loading..."}
      </p>

      {counts.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 16px",
          width: "100%",
          marginBottom: 16
        }}>
          {Object.entries(statusLabels).map(([key, label]) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8", fontSize: 13 }}>{label}</span>
              <span style={{ color: "#c0c0c0", fontSize: 13 }}>{countMap[key] || 0}</span>
            </div>
          ))}
        </div>
      )}

      {!hideActions && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: 16,
          borderTop: "1px solid #1e293b"
        }}>
          <button
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "transparent", color: "#fff", border: "none",
              fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.5-1.5 2-4 2-6 0-4.4-3.6-8-8-8S5 3.6 5 8c0 2 1 4.5 2.5 6M15 22H9"/>
              <path d="M12 2a3 3 0 0 0-3 3v2.5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M5 14.5A7 7 0 0 1 19 14.5V16a7 7 0 0 1-14 0v-1.5Z"/>
            </svg>
            Donate
          </button>
          <button
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "transparent", color: "#fff", border: "none",
              fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
