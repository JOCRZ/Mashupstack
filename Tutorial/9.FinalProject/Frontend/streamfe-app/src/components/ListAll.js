import { useState, useEffect, useRef } from "react";
import MovieHoverCard from "./MovieHoverCard";

const API = process.env.REACT_APP_API_URL || "";

function Card({ item, onHover }) {
  const timer = useRef(null);

  return (
    <div
      style={{ minWidth: 170, maxWidth: 170, cursor: "pointer" }}
      onMouseEnter={(e) => {
        clearTimeout(timer.current);
        const rect = e.currentTarget.getBoundingClientRect();
        onHover(item, { top: rect.top, left: rect.right });
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => onHover(null), 200);
      }}
    >
      <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", aspectRatio: "2/3", background: "#2a2a2a" }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 12 }}>
          Poster
        </div>
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

function Row({ data, onHover }) {
  return (
    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
      {data.map((item) => <Card key={item.id} item={item} onHover={onHover} />)}
    </div>
  );
}

function ListAll() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);
  const hoverTimer = useRef(null);
  const [onPopup, setOnPopup] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/movies`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleHover = (item, pos) => {
    clearTimeout(hoverTimer.current);
    if (item) {
      setHovered(item);
      setHoverPos(pos);
    } else {
      hoverTimer.current = setTimeout(() => {
        if (!onPopup) {
          setHovered(null);
          setHoverPos(null);
        }
      }, 200);
    }
  };

  if (loading) return <div style={{ padding: "0 5%", color: "#999" }}>Loading...</div>;
  if (error) return <div style={{ padding: "0 5%", color: "#e04060" }}>Failed to load movies</div>;

  return (
    <div style={{ padding: "0 5% 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>
          All Movies
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Row data={movies} onHover={handleHover} />
      </div>

      {hovered && hoverPos && (
        <div onMouseEnter={() => setOnPopup(true)} onMouseLeave={() => { setOnPopup(false); setHovered(null); setHoverPos(null); }}>
          <MovieHoverCard
            movie={hovered}
            position={hoverPos}
            onClose={() => { setHovered(null); setHoverPos(null); }}
          />
        </div>
      )}
    </div>
  );
}

export default ListAll;
