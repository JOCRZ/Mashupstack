import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#141414", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 5%"
      }}>
        <span style={{ color: "#2596be", fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
          StreamBucket
        </span>
        {user ? (
          <button onClick={() => navigate("/home")} style={{
            background: "#2596be", color: "#fff", border: "none",
            padding: "8px 24px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>
            Go to Home
          </button>
        ) : (
          <button onClick={() => setLoginOpen(true)} style={{
            background: "transparent", color: "#fff", border: "1px solid #555",
            padding: "8px 24px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>
            Sign In
          </button>
        )}
      </div>

      {/* Hero */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 5%"
      }}>
        <h1 style={{
          color: "#fff", fontSize: 48, fontWeight: 800, margin: 0,
          letterSpacing: -1, lineHeight: 1.1
        }}>
          Bucket full of stories
        </h1>Ready to watch? Enter your email 
        <p style={{
          color: "#94a3b8", fontSize: 18, margin: "16px 0 32px", maxWidth: 480
        }}>
          Enter your email to start watching
        </p>

        <div style={{
          display: "flex", gap: 8, width: "100%", maxWidth: 500
        }}>
          <input
            type="email"
            placeholder="Email address"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            style={{
              flex: 1, padding: "14px 16px", borderRadius: 6, border: "1px solid #333",
              background: "#1a1a1a", color: "#fff", fontSize: 15, outline: "none"
            }}
          />
          <button
            onClick={() => {
              if (!signupEmail.trim()) return;
              setRegisterOpen(true);
            }}
            style={{
              padding: "14px 28px", borderRadius: 6, border: "none",
              background: "#2596be", color: "#fff", fontSize: 15,
              fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => { setLoginOpen(false); setRegisterOpen(true); }}
      />
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => { setRegisterOpen(false); setSignupEmail(""); }}
        onSwitchToLogin={() => { setRegisterOpen(false); setLoginOpen(true); }}
        initialEmail={signupEmail}
      />
    </div>
  );
}

export default Landing;
