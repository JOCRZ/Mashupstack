import HeroBanner from "../components/HeroBanner";
import ContinueWatching from "../components/ContinueWatching";
import Top5 from "../components/Top5";
import ListAll from "../components/ListAll";

function Home() {
  return (
    <div>
      <HeroBanner />
      <div style={{
        display: "flex",
        gap: 24,
        padding: "20px 5% 40px"
      }}>
        <div style={{ flex: 2, minWidth: 0 }}>
          <ContinueWatching />
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <Top5 />
        </div>
      </div>
      <ListAll />
    </div>
  );
}

export default Home;