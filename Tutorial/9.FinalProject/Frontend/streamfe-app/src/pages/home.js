import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import Navbar from "../components/navbar";
import HeroBanner from "../components/HeroBanner";
import ContinueWatching from "../components/ContinueWatching";
import Top5 from "../components/Top5";
import ListAll from "../components/ListAll";

function Home() {
  const { user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div>
      <Navbar
        onOpenLogin={() => setLoginOpen(true)}
        onOpenRegister={() => setRegisterOpen(true)}
      />
      <HeroBanner />
      <div style={{
        display: "flex",
        gap: 24,
        padding: "20px 5% 40px"
      }}>
        <div style={{ flex: 2, minWidth: 0 }}>
          {user && <ContinueWatching />}
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <Top5 />
        </div>
      </div>
      <ListAll />

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

export default Home;
