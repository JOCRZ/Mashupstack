import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import SearchBar from "../components/searchbar";

function Landing() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 12,
        padding: "16px 5%",
      }}>
        {user ? (
          <>
            <span style={{ color: "#94a3b8", fontSize: 14 }}>Hi, {user.name}</span>
            <button onClick={() => navigate("/home")} style={{
              background: "#2596be", color: "#fff", border: "none",
              padding: "8px 20px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>
              Go to Home
            </button>
            <button onClick={() => { logout(); }} style={{
              background: "transparent", color: "#e04060", border: "1px solid #e04060",
              padding: "8px 20px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setLoginOpen(true)} style={{
              background: "transparent", color: "#fff", border: "1px solid #555",
              padding: "8px 20px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>
              Login
            </button>
            <button onClick={() => setRegisterOpen(true)} style={{
              background: "#2596be", color: "#fff", border: "none",
              padding: "8px 20px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>
              Register
            </button>
          </>
        )}
      </div>

      <h1>Stream Bucket</h1>

      <SearchBar />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => setRegisterOpen(true)}
      />
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </div>
  );
}

export default Landing;
