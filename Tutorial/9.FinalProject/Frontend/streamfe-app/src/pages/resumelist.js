import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";

const API = process.env.REACT_APP_API_URL || "";

function Resumelist() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/movie/${item.movieId}`)}
              style={{
                display: "flex", gap: 12, cursor: "pointer",
                background: "#1f1f1f", borderRadius: 8, padding: 10,
                alignItems: "center"
              }}
            >
              <div style={{
                width: 55, aspectRatio: "2/3", flexShrink: 0,
                borderRadius: 4, overflow: "hidden", background: "#2a2a2a"
              }}>
                {item.image ? (
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 10 }}>Poster</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.title}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ color: "#facc15", fontSize: 12, fontWeight: 700 }}>⭐ {item.rating}</span>
                  <span style={{ color: "#999", fontSize: 12 }}>{item.year}</span>
                  {item.language && (
                    <span style={{ color: "#2596be", fontSize: 10, background: "#2596be20", padding: "1px 6px", borderRadius: 4 }}>{item.language}</span>
                  )}
                  <span style={{ color: "#777", fontSize: 11, marginLeft: "auto" }}>
                    {new Date(item.watchedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resumelist;
