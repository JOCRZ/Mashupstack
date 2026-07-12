import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "";

const rankColors = {
  1: "#00d4ff",
  2: "#ff4080",
  3: "#ffc107"
};

function Top5() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/movies`)
      .then((r) => r.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);
        setMovies(sorted);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>
        Top Rated
      </h2>
      <div style={{ maxHeight: 278, overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {movies.map((item, i) => {
          const rank = i + 1;
          const accent = rankColors[rank] || "#555";
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/movie/${item.id}`)}
              style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            >
              <div style={{
                width: 40, textAlign: "center", flexShrink: 0,
                fontSize: 32, fontWeight: 900,
                color: accent, opacity: rank > 3 ? 0.3 : 1,
                WebkitTextStroke: `1.5px ${accent}`,
                WebkitTextFillColor: "transparent",
                fontFamily: "Arial Black, sans-serif"
              }}>
                {rank}
              </div>

              <div style={{
                flex: 1, display: "flex", gap: 10, alignItems: "center",
                background: "#1a1a1a", borderRadius: 8, padding: 8,
                borderLeft: `3px solid ${accent}`
              }}>
                <div style={{
                  width: 55, aspectRatio: "2/3", flexShrink: 0, borderRadius: 4,
                  overflow: "hidden", background: "#2a2a2a"
                }}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 10 }}>Poster</div>
                  )}
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 70, padding: "2px 0" }}>
                  <p style={{
                    color: "#fff", fontSize: 13, fontWeight: 700, margin: 0, lineHeight: 1.3,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {item.title}
                  </p>

                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginTop: 6 }}>
                    <span style={{ color: "#facc15", fontSize: 12, fontWeight: 700 }}>⭐ {item.rating}</span>
                    <span style={{ color: "#777", fontSize: 11 }}>{item.year}</span>
                    {item.language && (
                      <span style={{ color: "#2596be", fontSize: 10, background: "#2596be20", padding: "1px 6px", borderRadius: 4 }}>{item.language}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
        </div>
      </div>
  );
}

export default Top5;