import { createContext, useContext, useState, useCallback } from "react";

const API = process.env.REACT_APP_API_URL || "";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("streamUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Invalid credentials");
    }
    const data = await res.json();
    const userData = { email, name: email.split("@")[0], token: data.token };
    localStorage.setItem("streamUser", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await fetch(`${API}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Registration failed");
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API}/api/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user?.token}` }
      });
    } catch {}
    localStorage.removeItem("streamUser");
    setUser(null);
  }, [user?.token]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
