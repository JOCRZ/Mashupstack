const profileData = {
  userId: "112820257617867910",
  avatarUrl: "https://picsum.photos/seed/avatar/200/200",
  joinDate: "Jun 19, 2026",
  watchListCount: 0
};

function ProfileCard({ onClose, hideActions }) {
  return (
    <div style={{
      background: "#141414",
      border: "1px solid #2a2a2a",
      borderRadius: 12,
      padding: "28px 24px 20px",
      width: 280,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "3px solid #2596be",
        overflow: "hidden",
        marginBottom: 16
      }}>
        <img
          src={profileData.avatarUrl}
          alt="Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <p style={{
        color: "#e0e0e0",
        fontSize: 16,
        fontWeight: 700,
        margin: "0 0 20px",
        textAlign: "center",
        wordBreak: "break-all"
      }}>
        {profileData.userId}
      </p>

      <div style={{ width: "100%", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>Join date</span>
          <span style={{ color: "#c0c0c0", fontSize: 13 }}>{profileData.joinDate}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>Watch list</span>
          <span style={{ color: "#c0c0c0", fontSize: 13 }}>{profileData.watchListCount}</span>
        </div>
      </div>

      {!hideActions && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: 16,
          borderTop: "1px solid #1e293b"
        }}>
          <button
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "transparent", color: "#fff", border: "none",
              fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.5-1.5 2-4 2-6 0-4.4-3.6-8-8-8S5 3.6 5 8c0 2 1 4.5 2.5 6M15 22H9"/>
              <path d="M12 2a3 3 0 0 0-3 3v2.5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M5 14.5A7 7 0 0 1 19 14.5V16a7 7 0 0 1-14 0v-1.5Z"/>
            </svg>
            Donate
          </button>
          <button
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "transparent", color: "#fff", border: "none",
              fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
