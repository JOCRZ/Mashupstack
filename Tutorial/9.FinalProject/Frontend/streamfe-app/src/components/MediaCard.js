function MediaCard({ item }) {
  return (
    <div style={{ minWidth: 180, maxWidth: 180 }}>
      <div style={{
        position: "relative",
        borderRadius: 6,
        overflow: "hidden",
        aspectRatio: "2/3"
      }}>
        <img
          src={item.posterUrl}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.6)",
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <span style={{
            background: "#2596be",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "1px 6px",
            borderRadius: 3
          }}>
            EP {item.currentEpisode}
          </span>
          <span style={{ color: "#ddd", fontSize: 11 }}>
            {item.currentTime} / {item.totalTime}
          </span>
        </div>
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(255,255,255,0.2)"
        }}>
          <div style={{
            width: `${item.progressPercent}%`,
            height: "100%",
            background: "#2596be",
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>
      <p style={{
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        margin: "8px 0 0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}>
        {item.title}
      </p>
    </div>
  );
}

export default MediaCard;
