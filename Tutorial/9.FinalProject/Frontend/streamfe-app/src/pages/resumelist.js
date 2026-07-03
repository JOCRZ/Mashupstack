import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";

const API = process.env.REACT_APP_API_URL || "";

function Resumelist() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/history`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div style={{ background: "#141414", minHeight: "100vh", color: "#fff" }}>
      <Navbar />
      <div style={{ padding: "100px 5% 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 24px" }}>Watch History</h2>
        {loading && <p style={{ color: "#999" }}>Loading...</p>}
        {!loading && !items.length && <p style={{ color: "#999" }}>No history yet</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item) => (
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
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{item.title}</p>
                <p style={{ margin: "4px 0 0", color: "#999", fontSize: 13 }}>{item.year}</p>
              </div>
              <span style={{ color: "#777", fontSize: 12 }}>
                {new Date(item.watchedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resumelist;
