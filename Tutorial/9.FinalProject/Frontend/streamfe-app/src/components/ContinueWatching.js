import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "";

function Card({ item }) {
  const navigate = useNavigate();
  return (
    <div style={{ minWidth: 170, maxWidth: 170 }}>
      <div
        onClick={() => navigate(`/movie/${item.movieId}`)}
        style={{ position: "relative", borderRadius: 6, overflow: "hidden", aspectRatio: "2/3", background: "#2a2a2a", cursor: "pointer" }}
      >
        {item.image ? (
          <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 12 }}>
            Poster
          </div>
        )}
      </div>
      <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: "8px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {item.title}
      </p>
      <p style={{ color: "#999", fontSize: 12, margin: "2px 0 0" }}>
        {item.year}
      </p>
    </div>
  );
}

function ContinueWatching() {
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
        setItems(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading || !items.length) return null;

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>
          Continue Watching
        </h2>
        <span
          style={{ color: "#4ade80", fontSize: 14, cursor: "pointer", fontWeight: 600 }}
          onClick={() => navigate("/history")}
        >
          View more &gt;
        </span>
      </div>

      <div style={{
        display: "flex",
        gap: 16,
        overflowX: "auto",
        paddingBottom: 8,
        scrollbarWidth: "none"
      }}>
        {items.map((item) => (
          <Card key={item.movieId} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ContinueWatching;
