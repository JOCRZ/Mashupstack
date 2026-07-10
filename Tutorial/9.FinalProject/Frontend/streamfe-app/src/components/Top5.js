import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeaderboardRow from "./LeaderboardRow";

const API = process.env.REACT_APP_API_URL || "";

function Top5() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/movies`)
      .then((r) => r.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
        setMovies(sorted);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>
        Top Rated
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {movies.map((item, i) => (
          <div key={item.id} onClick={() => navigate(`/movie/${item.id}`)} style={{ cursor: "pointer" }}>
            <LeaderboardRow item={item} rank={i + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Top5;
