import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import ProfileCard from "./ProfileCard";
import ContinueWatchingSection from "./ContinueWatchingSection";
import WatchList from "./WatchList";

const tabs = [
  { key: "Profile", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", label: "Profile" },
  { key: "ContinueWatching", icon: "M12 8v4l2.5 1.5M12 21a9 9 0 1 1 2-17.7M14 2v5H9", label: "Continue Watching" },
  { key: "WatchList", icon: "M19 14c1.5-1.5 2-4 2-6 0-4.4-3.6-8-8-8S5 3.6 5 8c0 2 1 4.5 2.5 6M15 22H9", label: "Watch List" },
  { key: "Settings", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z", label: "Settings" },
  { key: "Import", icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3", label: "Import" }
];

function ProfileSection() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  function renderContent() {
    if (activeTab === "WatchList") {
      return <WatchList />;
    }

    if (activeTab === "ContinueWatching") {
      return <ContinueWatchingSection />;
    }

    return (
      <div style={{
        background: "#141414",
        border: "1px solid #2a2a2a",
        borderRadius: 12,
        padding: "28px 24px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#94a3b8", fontSize: 14, width: 160, flexShrink: 0 }}>Join date</span>
            <input type="text" value="Jun 19, 2026" disabled style={{
              flex: 1, padding: "10px 14px", borderRadius: 6, border: "1px solid #2a2a2a",
              background: "#1a1a1a", color: "#666", fontSize: 14, outline: "none"
            }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#94a3b8", fontSize: 14, width: 160, flexShrink: 0 }}>Email address</span>
            <input type="email" defaultValue="user@example.com" style={{
              flex: 1, padding: "10px 14px", borderRadius: 6, border: "1px solid #2a2a2a",
              background: "#1a1a1a", color: "#fff", fontSize: 14, outline: "none"
            }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#94a3b8", fontSize: 14, width: 160, flexShrink: 0 }}>Username</span>
            <input type="text" defaultValue="112820257617867910" style={{
              flex: 1, padding: "10px 14px", borderRadius: 6, border: "1px solid #2a2a2a",
              background: "#1a1a1a", color: "#fff", fontSize: 14, outline: "none"
            }} />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: "#94a3b8", fontSize: 14, width: 160, flexShrink: 0 }}>Reading list visibility</span>
            <div>
              <p style={{ color: "#666", fontSize: 12, margin: "0 0 10px", lineHeight: 1.5 }}>
                Enable other users to view your public, anon-friendly reading<br />
                lists that showcase your current, completed, and planned reads.
              </p>
              <div style={{ display: "flex", gap: 20 }}>
                <label style={{ color: "#ccc", fontSize: 13, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input type="radio" name="visibility" style={{ accentColor: "#2596be" }} /> Private
                </label>
                <label style={{ color: "#ccc", fontSize: 13, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input type="radio" name="visibility" defaultChecked style={{ accentColor: "#2596be" }} /> Public
                </label>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: "#94a3b8", fontSize: 14, width: 160, flexShrink: 0 }} />
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "transparent", color: "#2596be", border: "none",
              fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Change password
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
          <button style={{
            background: "#2596be", color: "#fff", border: "none",
            padding: "10px 32px", borderRadius: 6, fontSize: 14,
            fontWeight: 700, cursor: "pointer"
          }}>
            Update
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#141414", minHeight: "100vh" }}>
      <Navbar />
      <div style={{
        display: "flex",
        gap: 16,
        padding: "40px 2%",
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <div style={{ width: 280, flexShrink: 0 }}>
          <ProfileCard hideActions />
        </div>
        <div style={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 80px)" }} className="hide-scrollbar">
          <div style={{
            display: "flex",
            gap: 20,
            borderBottom: "1px solid #2a2a2a",
            paddingBottom: 12,
            marginBottom: 24,
            overflowX: "auto"
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "transparent",
                  color: activeTab === tab.key ? "#2596be" : "#777",
                  border: "none",
                  padding: "4px 0",
                  fontSize: 14,
                  fontWeight: activeTab === tab.key ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  borderBottom: activeTab === tab.key ? "2px solid #2596be" : "2px solid transparent",
                  marginBottom: -13
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
