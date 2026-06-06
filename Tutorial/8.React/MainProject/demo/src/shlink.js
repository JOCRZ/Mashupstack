const SHLINK_BASE = 'http://192.168.1.15:8080';
const API_KEY = 'my-api-key-123';

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

export async function getShortUrls(page = 1) {
  const res = await fetch(`${SHLINK_BASE}/rest/v3/short-urls?page=${page}`, {
    headers: { 'X-Api-Key': API_KEY },
  });
  if (!res.ok) throw new Error(`Shlink error: ${res.statusText}`);
  return res.json();
}

export async function getVisits(shortCode) {
  const res = await fetch(`${SHLINK_BASE}/rest/v3/short-urls/${shortCode}/visits`, {
    headers: { 'X-Api-Key': API_KEY },
  });
  if (!res.ok) throw new Error(`Shlink error: ${res.statusText}`);
  return res.json();
}
