const rankColors = {
  1: "#00d4ff",
  2: "#ff4080",
  3: "#ffc107"
};

function LeaderboardRow({ item, rank }) {
  const accent = rankColors[rank] || "#333";

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "#1a1a1a",
      borderRadius: 8,
      padding: 8,
      borderRight: `3px solid ${accent}`,
      gap: 10
    }}>
      <div style={{
        width: 36,
        textAlign: "center",
        fontSize: 24,
        fontWeight: 900,
        color: accent,
        WebkitTextStroke: `1px ${accent}`,
        WebkitTextFillColor: "transparent",
        fontFamily: "Arial Black, sans-serif"
      }}>
        {rank}
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8 }}>
        <p style={{
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          margin: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          flex: 1
        }}>
          {item.title}
        </p>
        <span style={{ color: "#777", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>
          {item.format}
        </span>
      </div>
    </div>
  );
}

export default LeaderboardRow;
