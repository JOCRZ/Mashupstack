import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./navbar";
import ProfileCard from "./ProfileCard";
import ContinueWatchingSection from "./ContinueWatchingSection";
import WatchList from "./WatchList";

const API = process.env.REACT_APP_API_URL || "";

const tabs = [
  { key: "Profile", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", label: "Profile" },
  { key: "ContinueWatching", icon: "M10 8l6 4-6 4V8zM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", label: "Continue Watching" },
  { key: "WatchList", icon: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", label: "Watch List" }
];

function ProfileSection() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Profile");
  const [profile, setProfile] = useState(null);

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

    if (activeTab === "Profile") {
      return (
        <div style={{
          background: "#141414",
          border: "1px solid #2a2a2a",
          borderRadius: 12,
          padding: "28px 24px"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#94a3b8", fontSize: 14, width: 160, flexShrink: 0 }}>Name</span>
              <span style={{ color: "#fff", fontSize: 14 }}>{profile ? profile.name : "..."}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#94a3b8", fontSize: 14, width: 160, flexShrink: 0 }}>Email</span>
              <span style={{ color: "#fff", fontSize: 14 }}>{profile ? profile.email : "..."}</span>
            </div>
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
      );
    }
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
