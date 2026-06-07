export const PER_PAGE = 3;
export const SHORT_BASE = 'http://192.168.1.15:8080';

export function cleanTitle(title) {
  if (!title) return null;
  return title
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[-|]/g, '–')
    .trim();
}

export function extractDomain(url) {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return ''; }
}

export function normalizeShortUrl(url) {
  try {
    const u = new URL(url);
    return `${SHORT_BASE}/${u.pathname.replace(/^\//, '')}`;
  } catch { return url; }
}
