// ─── Helper Utilities & Constants ────────────────────────

// Number of links per page
export const PER_PAGE = 3;
// Base URL for short links — read from .env, fallback for dev
export const SHORT_BASE = process.env.REACT_APP_SHLINK_BASE || 'http://192.168.1.15:8080';

// ─── cleanTitle ──────────────────────────────────────────
// Strips HTML tags, collapses whitespace, replaces hyphens/pipes with en-dash
// Used for cleaning the auto-fetched page title from Shlink
export function cleanTitle(title) {
  if (!title) return null;
  return title
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[-|]/g, '–')
    .trim();
}

// ─── extractDomain ───────────────────────────────────────
// Parses a URL and returns the hostname without 'www.' prefix
// Used for favicon lookup and display
export function extractDomain(url) {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return ''; }
}

// ─── normalizeShortUrl ──────────────────────────────────
// Ensures all short URLs use the configured SHORT_BASE
// Handles cases where Shlink returns a different hostname
export function normalizeShortUrl(url) {
  try {
    const u = new URL(url);
    return `${SHORT_BASE}/${u.pathname.replace(/^\//, '')}`;
  } catch { return url; }
}
