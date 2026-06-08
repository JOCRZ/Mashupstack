// Shlink API service — creates short URLs via the self-hosted Shlink REST API

const SHLINK_BASE = process.env.REACT_APP_SHLINK_BASE || 'http://192.168.1.15:8080';
const API_KEY = process.env.REACT_APP_API_KEY || '';

// POST /rest/v3/short-urls — creates a short URL and auto-fetches the page title
export async function shortenUrl(longUrl) {
  const res = await fetch(`${SHLINK_BASE}/rest/v3/short-urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
    },
    body: JSON.stringify({ longUrl, findTitle: true }),
  });
  if (!res.ok) throw new Error(`Shlink error: ${res.statusText}`);
  return res.json();
}
