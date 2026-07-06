import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "";

const statusOptions = ["WATCHING", "PLAN_TO_WATCH", "HOLD", "DROPPED", "COMPLETED"];

function MovieHoverCard({ movie, position, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [msg, setMsg] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const addToWatchList = async (status) => {
    if (!user) return;
    try {
      const res = await fetch(`${API}/api/watchlist/${movie.id}?status=${status}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const text = await res.text();
      setMsg(res.ok ? `Added as ${status.replace(/_/g, " ")}` : text);
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Failed to add");
    }
    setShowDropdown(false);
  };

  const style = {
    position: "fixed",
    zIndex: 500,
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 10,
    padding: 16,
    width: 280,
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
  };

  if (position.left + 300 > window.innerWidth) {
    style.right = window.innerWidth - position.left + 10;
  } else {
    style.left = position.left + 10;
  }

  if (position.top + 350 > window.innerHeight) {
    style.bottom = window.innerHeight - position.top + 10;
  } else {
    style.top = position.top - 10;
  }

  return (
    <div ref={ref} style={style}>
      <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{movie.title}</p>
      <p style={{ color: "#999", fontSize: 12, margin: "0 0 4px", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {movie.description}
      </p>
      <div style={{ display: "flex", gap: 8, margin: "8px 0" }}>
        <span style={{ color: "#94a3b8", fontSize: 12 }}>{movie.year}</span>
        <span style={{ color: "#94a3b8", fontSize: 12 }}>{movie.duration} min</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
        <button
          onClick={() => navigate(`/movie/${movie.id}`)}
          style={{
            flex: 1, padding: "8px 0", borderRadius: 6, border: "none",
            background: "#2596be", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer"
          }}
        >
          Watch Now
        </button>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              width: 36, height: 36, borderRadius: "50%", border: "1px solid #444",
              background: "transparent", color: "#fff", fontSize: 20, fontWeight: 300,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 1
            }}
          >
            +
          </button>
          {showDropdown && (
            <div style={{
              position: "absolute", top: "100%", right: 0, marginTop: 4, minWidth: 140,
              background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, overflow: "hidden"
            }}>
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => addToWatchList(s)}
                  style={{
                    display: "block", width: "100%", padding: "8px 12px",
                    background: "transparent", color: "#ccc", border: "none",
                    fontSize: 12, textAlign: "left", cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#2a2a2a"}
                  onMouseLeave={(e) => e.target.style.background = "transparent"}
                >
                  {s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {msg && <p style={{ color: "#4ade80", fontSize: 11, margin: "6px 0 0" }}>{msg}</p>}
    </div>
  );
}

export default MovieHoverCard;
