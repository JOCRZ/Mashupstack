import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ onOpenLogin, onOpenRegister }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const items = [
    { label: "Profile", action: () => navigate("/profile", { state: { tab: "Profile" } }) },
    { label: "Continue Watching", action: () => navigate("/profile", { state: { tab: "ContinueWatching" } }) },
    { label: "Watch List", action: () => navigate("/profile", { state: { tab: "WatchList" } }) },
    { label: "Logout", action: () => { handleLogout(); setOpen(false); } }
  ];

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 5%",
      background: "#141414",
      borderBottom: "1px solid #222"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#4ade80">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span onClick={() => navigate("/home")} style={{ color: "#fff", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, cursor: "pointer" }}>
          Stream Bucket
        </span>
      </div>

      <div style={{
        flex: 1,
        maxWidth: 540,
        display: "flex",
        alignItems: "center",
        gap: 4
      }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            background: "#2a2a2a",
            color: "#fff",
            border: "none",
            width: 36,
            height: 36,
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </button>
        <div style={{ flex: 1, position: "relative" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search anime..."
            style={{
              width: "100%",
              padding: "10px 14px 10px 36px",
              borderRadius: 8,
              border: "none",
              background: "#2a2a2a",
              color: "#fff",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>
        <button
          onClick={() => navigate("/filter")}
          style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "#2a2a2a",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21v-7"/>
            <path d="M4 10V3"/>
            <path d="M12 21v-9"/>
            <path d="M12 8V3"/>
            <path d="M20 21v-5"/>
            <path d="M20 12V3"/>
            <path d="M2 14h4"/>
            <path d="M10 8h4"/>
            <path d="M18 16h4"/>
          </svg>
          Filter
        </button>
      </div>

      {user ? (
        <div ref={menuRef} style={{ position: "relative" }}>
          <div
            onClick={() => setOpen(!open)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
              border: "2px solid #4ade80",
              flexShrink: 0
            }}
          >
            <img
              src="https://picsum.photos/seed/avatar/100/100"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {open && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 8,
              minWidth: 200,
              padding: "6px 0",
              zIndex: 100,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
            }}>
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { item.action(); setOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 20px",
                    background: "transparent",
                    color: item.label === "Logout" ? "#e04060" : "#fff",
                    border: "none",
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#2a2a2a"}
                  onMouseLeave={(e) => e.target.style.background = "transparent"}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onOpenLogin} style={{
            color: "#fff",
            border: "none",
            fontSize: 14,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 6,
            background: "#2a2a2a",
            cursor: "pointer"
          }}>
            Login
          </button>
          <button onClick={onOpenRegister} style={{
            color: "#fff",
            border: "none",
            fontSize: 14,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 6,
            background: "#2596be",
            cursor: "pointer"
          }}>
            Register
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
