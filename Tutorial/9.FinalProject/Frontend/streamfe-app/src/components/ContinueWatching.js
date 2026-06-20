import MediaCard from "./MediaCard";

const continueData = [
  {
    id: 1,
    title: "Seihantai na Kimi to Boku",
    posterUrl: "https://picsum.photos/seed/anime1/360/540",
    currentEpisode: 3,
    currentTime: "22:47",
    totalTime: "24:07",
    progressPercent: 94
  },
  {
    id: 2,
    title: "Naruto",
    posterUrl: "https://picsum.photos/seed/anime2/360/540",
    currentEpisode: 135,
    currentTime: "03:53",
    totalTime: "23:38",
    progressPercent: 16
  },
  {
    id: 3,
    title: "Attack on Titan",
    posterUrl: "https://picsum.photos/seed/anime3/360/540",
    currentEpisode: 87,
    currentTime: "11:30",
    totalTime: "24:00",
    progressPercent: 48
  },
  {
    id: 4,
    title: "Demon Slayer: Mugen Train",
    posterUrl: "https://picsum.photos/seed/anime4/360/540",
    currentEpisode: 1,
    currentTime: "05:15",
    totalTime: "26:40",
    progressPercent: 20
  },
  {
    id: 5,
    title: "One Piece",
    posterUrl: "https://picsum.photos/seed/anime5/360/540",
    currentEpisode: 1072,
    currentTime: "18:22",
    totalTime: "24:00",
    progressPercent: 76
  },
  {
    id: 6,
    title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e",
    posterUrl: "https://picsum.photos/seed/anime6/360/540",
    currentEpisode: 8,
    currentTime: "10:00",
    totalTime: "24:00",
    progressPercent: 42
  },
  {
    id: 7,
    title: "Jujutsu Kaisen",
    posterUrl: "https://picsum.photos/seed/anime7/360/540",
    currentEpisode: 23,
    currentTime: "20:30",
    totalTime: "24:00",
    progressPercent: 85
  }
];

function ContinueWatching() {
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>
          Continue Watching
        </h2>
        <span style={{ color: "#4ade80", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>
          View more &gt;
        </span>
      </div>

      <div style={{
        display: "flex",
        gap: 16,
        overflowX: "auto",
        paddingBottom: 8,
        scrollbarWidth: "none"
      }}>
        {continueData.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ContinueWatching;
