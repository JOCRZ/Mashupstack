// ─── Route Config & Auth Guard ───────────────────────────
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
// Reactive auth store — ProtectedRoute re-renders on login/logout
import useAuthStore from './stores/authStore';

// ─── Protected Route Wrapper ─────────────────────────────
// Reads auth state from Zustand store. If no user is logged in,
// immediately redirects to /login (replace: no back-button access)
function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" replace />;
}

// ─── App Component (Router Definition) ───────────────────
export default function App() {
  return (
    <Routes>
      {/* Public routes — accessible without authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected route — wrapped in auth guard */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      {/* Catch-all: any unknown path redirects to dashboard
          (which then bounces to /login if not authenticated) */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
