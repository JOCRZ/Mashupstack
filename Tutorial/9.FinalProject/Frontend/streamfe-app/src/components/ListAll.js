import { useState, useEffect, useRef } from "react";
import MovieHoverCard from "./MovieHoverCard";

const API = process.env.REACT_APP_API_URL || "";

function Card({ item, onHover, onClick }) {
  const timer = useRef(null);

  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={(e) => {
        clearTimeout(timer.current);
        const rect = e.currentTarget.getBoundingClientRect();
        onHover(item, { top: rect.top, left: rect.right + 20 });
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => onHover(null), 200);
      }}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onClick(item, { top: rect.top, left: rect.right + 20 });
      }}
    >
      <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", aspectRatio: "2/3", background: "#2a2a2a" }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 12 }}>
          Poster
        </div>
        {item.rating > 0 && (
          <span style={{
            position: "absolute", top: 6, left: 6,
            background: "rgba(0,0,0,0.75)", color: "#facc15",
            fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 4
          }}>
            ⭐ {item.rating}
          </span>
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

function ListAll() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);
  const hoverTimer = useRef(null);
  const [onPopup, setOnPopup] = useState(false);
  const [pinned, setPinned] = useState(false);

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
    if (pinned) return;
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

  const handleClick = (item, pos) => {
    clearTimeout(hoverTimer.current);
    setPinned(true);
    setHovered(item);
    setHoverPos(pos);
  };

  const handleClose = () => {
    setPinned(false);
    setHovered(null);
    setHoverPos(null);
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

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 20
      }}>
        {movies.map((item) => (
          <Card key={item.id} item={item} onHover={handleHover} onClick={handleClick} />
        ))}
      </div>

      {hovered && hoverPos && (
        <div
          onMouseEnter={() => setOnPopup(true)}
          onMouseLeave={() => { if (!pinned) { setOnPopup(false); setHovered(null); setHoverPos(null); } }}
        >
          <MovieHoverCard
            movie={hovered}
            position={hoverPos}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}

export default ListAll;
