import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (email) => set({ user: { email } }),
      logout: () => {
        set({ user: null });
      },
    }),
    { name: 'shlink_session' }
  )
);

export default useAuthStore;
