import { useState, useEffect } from 'react';
import { shortenUrl } from './shlink';
import './App.css';

function cleanTitle(title) {
  if (!title) return null;
  return title
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[-|]/g, '–')
    .trim();
}

function QrModal({ link, onClose }) {
  if (!link) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', padding: 24, borderRadius: 8, textAlign: 'center', width: 300, height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link.short)}`}
          alt="QR Code"
          style={{ width: 200, height: 200 }}
        />
        <p style={{ fontSize: '0.85em', color: '#666', wordBreak: 'break-all' }}>{link.short}</p>
        <button onClick={onClose} style={{ marginTop: 12, padding: '8px 24px', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [url, setUrl] = useState('');
  const [qrLink, setQrLink] = useState(null);
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('shlink_links');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shlink_links', JSON.stringify(links));
  }, [links]);

  async function handleShorten(e) {
    e.preventDefault();
    try {
      const data = await shortenUrl(url);
      const title = cleanTitle(data.title) || new URL(url).hostname;
      setLinks(prev => [{ title, short: data.shortUrl, long: data.longUrl, date: new Date().toISOString() }, ...prev]);
      setUrl('');
    } catch (err) {
      alert('Failed to shorten: ' + err.message);
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <QrModal link={qrLink} onClose={() => setQrLink(null)} />
      <h1>Ziplink</h1>
      <form onSubmit={handleShorten} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          type="url"
          placeholder="Paste a long URL..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Shorten</button>
      </form>
      <h2>Links</h2>
      {links.length === 0 && <p style={{ color: '#888' }}>No links yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {links.map((link, i) => (
          <li key={i} style={{ marginBottom: 12, padding: 12, border: '1px solid #ddd', borderRadius: 4 }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{link.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <a href={link.short} target="_blank" rel="noreferrer">{link.short}</a>
              <button onClick={() => setQrLink(link)} style={{
                padding: '2px 8px', fontSize: '0.75em', cursor: 'pointer', background: '#eee', border: '1px solid #ccc', borderRadius: 4
              }}>
                QR
              </button>
            </div>
            <div style={{ fontSize: '0.8em', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {link.long}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
