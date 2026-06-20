import { useState } from "react";

const filters = ["All", "Sub", "Dub", "Trending", "Random"];

const episodes = [
  { title: "Solo Leveling S2", poster: "https://picsum.photos/seed/ep1/360/540", sub: "11", dub: "9", type: "TV" },
  { title: "One Piece", poster: "https://picsum.photos/seed/ep2/360/540", sub: "1166", dub: "1155", type: "TV" },
  { title: "Dandadan", poster: "https://picsum.photos/seed/ep3/360/540", sub: "12", dub: "10", type: "TV" },
  { title: "Blue Lock vs. U-20", poster: "https://picsum.photos/seed/ep4/360/540", sub: "10", dub: "8", type: "TV" },
  { title: "Attack on Titan", poster: "https://picsum.photos/seed/ep5/360/540", sub: "87", dub: "85", type: "TV" },
  { title: "Jujutsu Kaisen", poster: "https://picsum.photos/seed/ep6/360/540", sub: "23", dub: "23", type: "TV" },
  { title: "Demon Slayer", poster: "https://picsum.photos/seed/ep7/360/540", sub: "44", dub: "42", type: "TV" },
  { title: "Naruto Shippuden", poster: "https://picsum.photos/seed/ep8/360/540", sub: "500", dub: "500", type: "TV" },
  { title: "Classroom of Elite", poster: "https://picsum.photos/seed/ep9/360/540", sub: "13", dub: "11", type: "TV" },
  { title: "Mushoku Tensei", poster: "https://picsum.photos/seed/ep10/360/540", sub: "11", dub: "9", type: "TV" }
];

const row2 = [
  { title: "Vinland Saga", poster: "https://picsum.photos/seed/ep11/360/540", sub: "24", dub: "24", type: "TV" },
  { title: "Chainsaw Man", poster: "https://picsum.photos/seed/ep12/360/540", sub: "12", dub: "12", type: "Movie" },
  { title: "Spy x Family", poster: "https://picsum.photos/seed/ep13/360/540", sub: "25", dub: "25", type: "TV" },
  { title: "My Hero Academia", poster: "https://picsum.photos/seed/ep14/360/540", sub: "138", dub: "135", type: "TV" },
  { title: "Re:Zero S3", poster: "https://picsum.photos/seed/ep15/360/540", sub: "8", dub: "6", type: "TV" },
  { title: "Oshi no Ko", poster: "https://picsum.photos/seed/ep16/360/540", sub: "11", dub: "9", type: "TV" },
  { title: "Frieren", poster: "https://picsum.photos/seed/ep17/360/540", sub: "28", dub: "28", type: "TV" },
  { title: "Kaiju No. 8", poster: "https://picsum.photos/seed/ep18/360/540", sub: "12", dub: "10", type: "TV" },
  { title: "Wind Breaker", poster: "https://picsum.photos/seed/ep19/360/540", sub: "13", dub: "11", type: "TV" },
  { title: "Tower of God S2", poster: "https://picsum.photos/seed/ep20/360/540", sub: "10", dub: "8", type: "TV" }
];

function Card({ item }) {
  return (
    <div style={{ minWidth: 170, maxWidth: 170 }}>
      <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", aspectRatio: "2/3" }}>
        <img src={item.poster} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "6px 8px",
          display: "flex",
          gap: 4,
          flexWrap: "wrap"
        }}>
          <span style={{ background: "#2596be", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3 }}>
            Sub {item.sub}
          </span>
          <span style={{ background: "#e04060", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3 }}>
            Dub {item.dub}
          </span>
          <span style={{ background: "#555", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3 }}>
            {item.type}
          </span>
        </div>
      </div>
      <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: "8px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {item.title}
      </p>
    </div>
  );
}

function Row({ data }) {
  return (
    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
      {data.map((item, i) => <Card key={i} item={item} />)}
    </div>
  );
}

function ListAll() {
  const [active, setActive] = useState("All");

  return (
    <div style={{ padding: "0 5% 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>
          Latest Episode
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  background: "transparent",
                  color: active === f ? "#2596be" : "#777",
                  border: "none",
                  padding: "4px 10px",
                  fontSize: 13,
                  fontWeight: active === f ? 700 : 500,
                  cursor: "pointer"
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button style={{ background: "#2a2a2a", color: "#fff", border: "none", width: 28, height: 28, borderRadius: 4, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>&lt;</button>
            <button style={{ background: "#2a2a2a", color: "#fff", border: "none", width: 28, height: 28, borderRadius: 4, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>&gt;</button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Row data={episodes} />
        <Row data={row2} />
      </div>
    </div>
  );
}

export default ListAll;
