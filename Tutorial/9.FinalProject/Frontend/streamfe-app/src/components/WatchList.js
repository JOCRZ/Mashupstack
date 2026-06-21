import { useState } from "react";

const subTabs = ["All", "Watching", "On-Hold", "Planned", "Dropped", "Watched"];

function WatchList() {
  const [activeSub, setActiveSub] = useState("All");

  return (
    <div style={{
      background: "#141414",
      border: "1px solid #2a2a2a",
      borderRadius: 12,
      padding: "24px"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
        <p style={{ color: "#666", fontSize: 12, margin: 0 }}>- Click on the folder icon to organize your watch list.</p>
        <p style={{ color: "#666", fontSize: 12, margin: 0 }}>- Hold down and drag to rearrange items.</p>
        <p style={{ color: "#666", fontSize: 12, margin: 0 }}>- Click to toggle between public and private visibility.</p>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20, borderBottom: "1px solid #2a2a2a", paddingBottom: 12 }}>
        {subTabs.map((st) => (
          <button
            key={st}
            onClick={() => setActiveSub(st)}
            style={{
              background: "transparent",
              border: "none",
              color: activeSub === st ? "#fff" : "#555",
              fontSize: 13,
              fontWeight: activeSub === st ? 700 : 500,
              cursor: "pointer",
              padding: "4px 0"
            }}
          >
            {st}
          </button>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 10
      }}>
        <input type="text" placeholder="Search..." style={{
          padding: "8px 10px", borderRadius: 6, border: "1px solid #2a2a2a",
          background: "#1a1a1a", color: "#fff", fontSize: 13, outline: "none"
        }} />
        {["Select genre", "Select season", "Select year", "Select type", "Select status"].map((p) => (
          <select key={p} style={{
            width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #2a2a2a",
            background: "#1a1a1a", color: "#888", fontSize: 13, outline: "none", cursor: "pointer"
          }}>
            <option>{p}</option>
          </select>
        ))}
        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          background: "#2596be", color: "#fff", border: "none",
          padding: "8px", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer"
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/>
          </svg>
          Filter
        </button>
        {["Select language", "Select rating", "Select source", "Episode range", "Default"].map((p) => (
          <select key={p} style={{
            width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #2a2a2a",
            background: "#1a1a1a", color: "#888", fontSize: 13, outline: "none", cursor: "pointer"
          }}>
            <option>{p}</option>
          </select>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
