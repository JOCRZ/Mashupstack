// ─── Auth Store (Zustand with Persist) ───────────────────
// Manages user session state with automatic localStorage persistence
// Components read `useAuthStore(s => s.user)` reactively — no prop drilling

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // Initial state: no user logged in
      user: null,
      // Login: stores user object in state (persist auto-writes to localStorage)
      login: (email) => set({ user: { email } }),
      // Logout: clears user (persist auto-updates localStorage)
      logout: () => {
        set({ user: null });
      },
    }),
    // Persist config: syncs store state to localStorage under 'shlink_session' key
    { name: 'shlink_session' }
  )
);

export default useAuthStore;
