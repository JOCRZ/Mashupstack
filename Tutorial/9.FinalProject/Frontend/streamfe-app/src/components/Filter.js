import { useState, useEffect } from "react";
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
  return (
    <div style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "2/3", background: "#2a2a2a" }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 12 }}>
          Poster
        </div>
        {item.score && (
          <span style={{
            position: "absolute", top: 8, left: 8,
            background: "rgba(0,0,0,0.75)", color: "#facc15",
            fontSize: 12, fontWeight: 700, padding: "2px 8px",
            borderRadius: 4
          }}>
            ⭐ {item.score}
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
      result.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sort === "year") {
      result.sort((a, b) => b.year - a.year);
    } else if (sort === "title_asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title_desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(result);
  };

  const selectStyle = {
    padding: "10px 12px", borderRadius: 6, border: "1px solid #333",
    background: "#1a1a1a", color: "#ccc", fontSize: 13, outline: "none", cursor: "pointer"
  };

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
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 20
          }}>
            {filtered.map((movie) => (
              <FilterCard key={movie.id} item={movie} />
            ))}
          </div>
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
