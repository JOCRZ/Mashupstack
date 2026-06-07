import { create } from 'zustand';
import { normalizeShortUrl } from '../utils';

function getLinksKey(email) {
  return `shlink_links_${email || 'default'}`;
}

const useLinksStore = create((set, get) => ({
  links: [],
  storageKey: getLinksKey(null),

  loadLinks: (email) => {
    const key = getLinksKey(email);
    const saved = localStorage.getItem(key);
    const links = saved
      ? JSON.parse(saved).map(l => ({ ...l, short: normalizeShortUrl(l.short) }))
      : [];
    set({ links, storageKey: key });
  },

  saveLinks: () => {
    const { links, storageKey } = get();
    localStorage.setItem(storageKey, JSON.stringify(links));
  },

  addLink: (link) => {
    set((state) => ({ links: [{ ...link, date: new Date().toISOString() }, ...state.links] }));
    get().saveLinks();
  },

  updateLink: (updated) => {
    set((state) => ({
      links: state.links.map(l => l.short === updated.short ? updated : l),
    }));
    get().saveLinks();
  },

  deleteLink: (short) => {
    set((state) => ({
      links: state.links.filter(l => l.short !== short),
    }));
    get().saveLinks();
  },
}));

export default useLinksStore;
