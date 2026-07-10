import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const API = process.env.REACT_APP_API_URL || "";

const years = Array.from({ length: 31 }, (_, i) => 2026 - i);
const languages = ["English", "Hindi", "Malayalam", "Tamil", "Telugu", "Kannada", "Spanish", "French", "Japanese", "Korean"];
const sorts = [
  { value: "", label: "Default" },
  { value: "score", label: "Score" },
  { value: "year", label: "Release Date" },
  { value: "title_asc", label: "Name A - Z" },
  { value: "title_desc", label: "Name Z - A" },
];

function FilterCard({ item }) {
  const navigate = useNavigate();
  return (
    <div style={{ cursor: "pointer" }}>
      <div
        onClick={() => navigate(`/movie/${item.id}`)}
        style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "2/3", background: "#2a2a2a", cursor: "pointer" }}
      >
        {item.image ? (
          <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 12 }}>
            Poster
          </div>
        )}
        {item.rating > 0 && (
          <span style={{
            position: "absolute", top: 8, left: 8,
            background: "rgba(0,0,0,0.75)", color: "#facc15",
            fontSize: 12, fontWeight: 700, padding: "2px 8px",
            borderRadius: 4
          }}>
            ⭐ {item.rating}
          </span>
        )}
      </div>
      <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: "8px 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {item.title}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "#999", fontSize: 12 }}>{item.year}</span>
        {item.language && (
          <span style={{
            background: "#2596be20", color: "#2596be",
            fontSize: 10, fontWeight: 600, padding: "1px 6px",
            borderRadius: 4, border: "1px solid #2596be40"
          }}>
            {item.language}
          </span>
        )}
      </div>
    </div>
  );
}

function Filter() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    fetch(`${API}/api/movies`)
      .then((r) => r.json())
      .then((data) => {
        setMovies(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const applyFilter = () => {
    let result = [...movies];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((m) => m.title.toLowerCase().includes(q));
    }
    if (year) {
      result = result.filter((m) => String(m.year) === year);
    }
    if (language) {
      result = result.filter((m) => m.language === language);
    }
    if (sort === "score") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "year") {
      result.sort((a, b) => b.year - a.year);
    } else if (sort === "title_asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title_desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(result);
    setPage(1);
  };

  const selectStyle = {
    padding: "10px 12px", borderRadius: 6, border: "1px solid #333",
    background: "#1a1a1a", color: "#ccc", fontSize: 13, outline: "none", cursor: "pointer"
  };

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div style={{ padding: "0 5%", color: "#999" }}>Loading...</div>;

  return (
    <div>
      <Navbar
        onOpenLogin={() => setLoginOpen(true)}
        onOpenRegister={() => setRegisterOpen(true)}
      />
      <div style={{ padding: "24px 5% 60px" }}>
        {/* Filter Bar */}
        <div style={{
          display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap",
          padding: "14px 18px", background: "#1a1a1a", borderRadius: 10,
          border: "1px solid #2a2a2a", marginBottom: 28
        }}>
          <input
            type="text" placeholder="🔍 Search movies..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 180px", padding: "10px 14px", borderRadius: 6, border: "1px solid #333",
              background: "#141414", color: "#fff", fontSize: 13, outline: "none"
            }}
          />
          <select value={year} onChange={(e) => setYear(e.target.value)} style={selectStyle}>
            <option value="">Select Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={selectStyle}>
            <option value="">Select Language</option>
            {languages.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
            {sorts.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button onClick={applyFilter} style={{
            padding: "10px 24px", borderRadius: 6, border: "none",
            background: "#2596be", color: "#fff", fontSize: 13,
            fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
          }}>
            Filter
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", marginTop: 60 }}>No movies found</p>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 20
            }}>
              {paginated.map((movie) => (
                <FilterCard key={movie.id} item={movie} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                gap: 8, marginTop: 32
              }}>
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  style={{
                    padding: "8px 16px", borderRadius: 6, border: "1px solid #333",
                    background: page === 1 ? "#1a1a1a" : "#2a2a2a",
                    color: page === 1 ? "#555" : "#fff", fontSize: 13,
                    cursor: page === 1 ? "default" : "pointer"
                  }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      width: 32, height: 32, borderRadius: 6, border: "none",
                      background: page === p ? "#2596be" : "#2a2a2a",
                      color: "#fff", fontSize: 13, fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  style={{
                    padding: "8px 16px", borderRadius: 6, border: "1px solid #333",
                    background: page === totalPages ? "#1a1a1a" : "#2a2a2a",
                    color: page === totalPages ? "#555" : "#fff", fontSize: 13,
                    cursor: page === totalPages ? "default" : "pointer"
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => { setLoginOpen(false); setRegisterOpen(true); }}
      />
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => { setRegisterOpen(false); setLoginOpen(true); }}
      />
    </div>
  );
}

export default Filter;
