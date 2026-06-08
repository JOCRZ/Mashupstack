// ─── Links Store (Zustand — Manual localStorage Sync) ───
// Manages link CRUD with per-user localStorage keys
// Unlike authStore, doesn't use persist middleware because storage key is dynamic

import { create } from 'zustand';
import { normalizeShortUrl } from '../utils';

// ─── Dynamic Storage Key ─────────────────────────────────
// Each user's links stored under their email: "shlink_links_{email}"
function getLinksKey(email) {
  return `shlink_links_${email || 'default'}`;
}

const useLinksStore = create((set, get) => ({
  // ─── State ─────────────────────────────────────────────
  links: [],                     // Array of link objects in memory
  storageKey: getLinksKey(null),  // Current user's localStorage key

  // ─── loadLinks ─────────────────────────────────────────
  // Reads links from localStorage by user email
  // Normalizes short URLs to ensure consistent base
  loadLinks: (email) => {
    const key = getLinksKey(email);
    const saved = localStorage.getItem(key);
    const links = saved
      ? JSON.parse(saved).map(l => ({ ...l, short: normalizeShortUrl(l.short) }))
      : [];
    set({ links, storageKey: key });
  },

  // ─── saveLinks ─────────────────────────────────────────
  // Writes current links array to localStorage under current storageKey
  // Called automatically at the end of every mutation
  saveLinks: () => {
    const { links, storageKey } = get();
    localStorage.setItem(storageKey, JSON.stringify(links));
  },

  // ─── addLink ───────────────────────────────────────────
  // Prepends new link with current date, then auto-saves
  addLink: (link) => {
    set((state) => ({ links: [{ ...link, date: new Date().toISOString() }, ...state.links] }));
    get().saveLinks();
  },

  // ─── updateLink ────────────────────────────────────────
  // Replaces link with matching short URL, then auto-saves
  updateLink: (updated) => {
    set((state) => ({
      links: state.links.map(l => l.short === updated.short ? updated : l),
    }));
    get().saveLinks();
  },

  // ─── deleteLink ────────────────────────────────────────
  // Removes link by short URL, then auto-saves
  deleteLink: (short) => {
    set((state) => ({
      links: state.links.filter(l => l.short !== short),
    }));
    get().saveLinks();
  },
}));

export default useLinksStore;
