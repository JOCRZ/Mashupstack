import { useState, useEffect, useCallback } from "react";

const banners = [
  {
    title: "Chainsaw Man : Reze Arc",
    rating: "8.3",
    format: "TV",
    year: "2025",
    desc: "In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.",
    image: "/images/banner/cs.png"
  },
  {
    title: "Attack on Titan : Last Attack",
    rating: "9.1",
    format: "TV",
    year: "2023",
    desc: "The epic conclusion to the battle between Eldia and Marley reaches its devastating climax as Eren unleashes the Rumbling...",
    image: "/images/banner/aot.png"
  },
  {
    title: "Demon Slayer : Infinity Castle",
    rating: "8.9",
    format: "Movie",
    year: "2025",
    desc: "Tanjiro and his comrades face the most powerful Upper Moon demons in the Infinity Castle...",
    image: "/images/banner/ds.png"
  },
  {
    title: "Solo Leveling : Beyond the System",
    rating: "8.7",
    format: "TV",
    year: "2025",
    desc: "Jin-Woo continues his rise as the Shadow Monarch, facing increasingly powerful foes...",
    image: "/images/banner/sl.png"
  }
];

function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = banners[current];

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className="hero-banner"
        style={{
          position: "relative",
          minHeight: "70vh",
          backgroundImage: `url(${banner.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)",
          zIndex: 1
        }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 600,
          padding: "60px 5%",
          width: "100%"
        }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <span style={{
              background: "rgba(0,0,0,0.6)",
              color: "#8fdf8f",
              padding: "2px 10px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4
            }}>
              <span style={{ color: "#8fdf8f" }}>&#9733;</span> {banner.rating}
            </span>
            <span style={{
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              padding: "2px 10px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600
            }}>
              {banner.format}
            </span>
            <span style={{
              background: "rgba(0,0,0,0.6)",
              color: "#8fdf8f",
              padding: "2px 10px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600
            }}>
              {banner.year}
            </span>
          </div>

          <h1 style={{
            color: "#fff",
            fontSize: 42,
            fontWeight: 800,
            margin: "0 0 12px",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}>
            {banner.title}
          </h1>

          <p style={{
            color: "#ccc",
            fontSize: 14,
            lineHeight: 1.6,
            margin: "0 0 28px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {banner.desc}
          </p>

          <div style={{ display: "flex", gap: 14 }}>
            <button style={{
              background: "#4ade80",
              color: "#000",
              border: "none",
              padding: "10px 30px",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 2,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transform: "skewX(-8deg)"
            }}>
              <span style={{ transform: "skewX(8deg)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>&#9654;</span> WATCH NOW
              </span>
            </button>
            <button style={{
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "10px 24px",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 2,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              backdropFilter: "blur(4px)"
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "2px solid #fff",
                fontSize: 12,
                fontWeight: 700
              }}>i</span> DETAILS
            </button>
          </div>
        </div>

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, #141414 0%, transparent 100%)",
          zIndex: 2
        }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to top, #141414 0%, transparent 100%)",
          zIndex: 2
        }} />

        <div style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          zIndex: 10
        }}>
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 28 : 12,
                height: 12,
                borderRadius: 6,
                border: "none",
                background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
