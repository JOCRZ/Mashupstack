import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

const API = process.env.REACT_APP_API_URL || "";

const controlBtn = {
  background: "transparent",
  border: "none",
  color: "#bbb",
  fontSize: 12,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "4px 8px",
  borderRadius: 4,
  fontWeight: 500,
};

function Content() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const srcRef = useRef(`${API}/videos/${id}`);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/movies/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [movie]);

  const toggleFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (loading) return <div style={{ minHeight: "100vh", background: "#141414", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>Loading...</div>;
  if (!movie) return <div style={{ minHeight: "100vh", background: "#141414", display: "flex", alignItems: "center", justifyContent: "center", color: "#e04060" }}>Movie not found</div>;

  const synopsisShort = movie.description?.length > 200
    ? movie.description.slice(0, 200) + "..."
    : movie.description;

  return (
    <div style={{ minHeight: "100vh", background: "#141414" }}>
      <Navbar
        onOpenLogin={() => setLoginOpen(true)}
        onOpenRegister={() => setRegisterOpen(true)}
      />

      <div style={{
        background: "#000", display: "flex", flexDirection: "column",
        height: isFullscreen ? "100vh" : "auto"
      }} ref={playerRef}>
        <div style={{
          flex: isFullscreen ? 1 : "none",
          position: "relative", display: "flex", alignItems: "center",
          justifyContent: "center", overflow: "hidden"
        }}>
          <video
            ref={videoRef}
            src={srcRef.current}
            poster={movie.image}
            autoPlay={autoPlay}
            muted={autoPlay}
            controls={false}
            style={{
              width: "100%", display: "block",
              maxHeight: isFullscreen ? "100%" : 540,
              maxWidth: isFullscreen ? "100%" : 960
            }}
          />
          {!playing && (
            <div
              onClick={togglePlay}
              style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", cursor: "pointer"
              }}
            >
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(128,90,213,0.85)", display: "flex",
                alignItems: "center", justifyContent: "center"
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "8px 5%", borderTop: "1px solid #222"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <button onClick={togglePlay} style={controlBtn}>
              {playing ? "⏸" : "▶"} {playing ? "Pause" : "Play"}
            </button>
            <span style={{ color: "#444" }}>|</span>
            <button onClick={toggleFullscreen} style={controlBtn}>
              <span style={{ fontSize: 14 }}>⛶</span> Expand
            </button>
            <span style={{ color: "#444" }}>|</span>
            <label style={{ ...controlBtn, cursor: "pointer" }}>
              <input type="checkbox" checked={autoPlay} onChange={() => setAutoPlay(!autoPlay)} style={{ accentColor: "#2596be" }} />
              {" Auto Play"}
            </label>
            <span style={{ color: "#444" }}>|</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={controlBtn}>⚠️ Report</button>
            <button style={controlBtn}>+ Add to list</button>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 5% 60px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent", border: "none", color: "#94a3b8",
            fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 20, display: "block"
          }}
        >
          &larr; Back
        </button>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0, width: 220 }}>
            {movie.image ? (
              <img
                src={movie.image}
                alt={movie.title}
                style={{ width: "100%", borderRadius: 8, display: "block" }}
              />
            ) : (
              <div style={{
                width: "100%", aspectRatio: "2/3", borderRadius: 8,
                background: "#2a2a2a", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#555", fontSize: 12
              }}>
                Poster
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>
              {movie.title}
            </h1>
            <p style={{ color: "#888", fontSize: 14, margin: "0 0 12px", fontStyle: "italic" }}>
              {movie.language} &middot; {movie.year}
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              <span style={{
                background: "#2596be20", color: "#2596be", fontSize: 11,
                fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                border: "1px solid #2596be40"
              }}>
                HD
              </span>
              {movie.rating > 0 && (
                <span style={{
                  background: "#facc1520", color: "#facc15", fontSize: 11,
                  fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                  border: "1px solid #facc1540"
                }}>
                  ⭐ {movie.rating}
                </span>
              )}
              {movie.language && (
                <span style={{
                  background: "#4ade8020", color: "#4ade80", fontSize: 11,
                  fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                  border: "1px solid #4ade8040"
                }}>
                  {movie.language}
                </span>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                {synopsisExpanded ? movie.description : synopsisShort}
                {movie.description?.length > 200 && (
                  <span
                    onClick={() => setSynopsisExpanded(!synopsisExpanded)}
                    style={{ color: "#2596be", cursor: "pointer", marginLeft: 4, fontSize: 13 }}
                  >
                    [{synopsisExpanded ? "less" : "more"}]
                  </span>
                )}
              </p>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 40px",
              background: "#1a1a1a", borderRadius: 8, padding: 20,
              border: "1px solid #2a2a2a"
            }}>
              <div>
                <p style={{ margin: "0 0 8px", color: "#888", fontSize: 12, fontWeight: 600 }}>TYPE</p>
                <p style={{ margin: "0 0 16px", color: "#fff", fontSize: 13 }}>Movie</p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", color: "#888", fontSize: 12, fontWeight: 600 }}>SCORES</p>
                <p style={{ margin: "0 0 16px", color: "#facc15", fontSize: 13 }}>
                  ⭐ {movie.rating || "N/A"} / 10
                </p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", color: "#888", fontSize: 12, fontWeight: 600 }}>COUNTRY</p>
                <p style={{ margin: "0 0 16px", color: "#2596be", fontSize: 13 }}>{movie.language || "N/A"}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", color: "#888", fontSize: 12, fontWeight: 600 }}>DURATION</p>
                <p style={{ margin: "0 0 16px", color: "#fff", fontSize: 13 }}>{movie.duration || "N/A"}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", color: "#888", fontSize: 12, fontWeight: 600 }}>PREMIERED</p>
                <p style={{ margin: "0 0 16px", color: "#fff", fontSize: 13 }}>{movie.year || "N/A"}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", color: "#888", fontSize: 12, fontWeight: 600 }}>STATUS</p>
                <p style={{ margin: "0", color: "#4ade80", fontSize: 13 }}>Released</p>
              </div>
            </div>
          </div>
        </div>
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

export default Content;
