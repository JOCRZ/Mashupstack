import { useState } from "react";
import LeaderboardRow from "./LeaderboardRow";

const tabs = ["Day", "Week", "Month"];

const topData = [
  { title: "Tensei shitara Slime Datta Ken 4th Season", format: "TV" },
  { title: "One Piece", format: "TV" },
  { title: "Solo Leveling Season 2", format: "TV" },
  { title: "Dandadan", format: "TV" },
  { title: "Blue Lock vs. U-20 Japan", format: "TV" }
];

function Top5() {
  const [timeframe, setTimeframe] = useState("Day");

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>
          Top anime
        </h2>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeframe(tab)}
              style={{
                background: timeframe === tab ? "#2596be" : "#2a2a2a",
                color: "#fff",
                border: "none",
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 4,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {topData.map((item, i) => (
          <LeaderboardRow key={i} item={item} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}

export default Top5;
