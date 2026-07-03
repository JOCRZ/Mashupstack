import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "";

const subTabs = ["All", "Watching", "On-Hold", "Planned", "Dropped", "Watched"];

const statusMap = {
  "All": null,
  "Watching": "WATCHING",
  "On-Hold": "HOLD",
  "Planned": "PLAN_TO_WATCH",
  "Dropped": "DROPPED",
  "Watched": "COMPLETED"
};

function WatchList() {
  const { user } = useAuth();
  const [activeSub, setActiveSub] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/watchlist`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const filtered = statusMap[activeSub]
    ? items.filter((i) => i.status === statusMap[activeSub])
    : items;

  return (
    <div style={{
      background: "#141414",
      border: "1px solid #2a2a2a",
      borderRadius: 12,
      padding: "24px"
    }}>
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

      {loading && <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Loading...</p>}
      {!loading && !filtered.length && (
        <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Your watch list is empty.</p>
      )}
      {!loading && filtered.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#1f1f1f",
                padding: "12px 16px",
                borderRadius: 8
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#fff" }}>{item.title}</p>
                <p style={{ margin: "4px 0 0", color: "#999", fontSize: 13 }}>{item.year}</p>
              </div>
              <span style={{
                background: "#2596be",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 4
              }}>
                {item.status.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchList;
