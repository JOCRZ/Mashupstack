# Ziplink — Project Setup Steps

## 1. Created React app (existing project)
- Located at `/home/jo/Documents/Mashupstack/Tutorial/8.React/MainProject/demo`
- Created with Create React App (`react-scripts`)

## 2. Set up Shlink (self-hosted URL shortener) with Docker
- Created `docker-compose.yml` in project root
- Uses `shlinkio/shlink:stable` image
- Runs on port `8080`
- Uses SQLite (no external database needed)
- API key: `my-api-key-123`
- Default domain: `192.168.1.15:8080` (local network IP so other devices can access)

## 3. Created API helper (`src/shlink.js`)
- `shortenUrl(longUrl)` — creates a short URL (with auto title fetching)
- `getShortUrls(page)` — lists all short URLs
- `getVisits(shortCode)` — gets visit stats
- Points to `http://192.168.1.15:8080`

## 4. Built the React UI (`src/App.js`)
- URL input form with "Shorten" button
- Auto-fetches and cleans page titles via Shlink
- Saves all links to **localStorage** (persists on refresh)
- Each link shows: title, clickable short link, original URL
- **QR Code modal** — each link has a "QR" button that opens a fixed-size modal (300x340) with a scannable QR code
- Uses `api.qrserver.com` for QR generation (no extra packages)

## 5. Running the project
```bash
# Start Shlink backend
docker compose up -d

# Start React frontend (in another terminal)
npm start
```

## Commands
| Action | Command |
|--------|---------|
| Start Shlink | `docker compose up -d` |
| Stop Shlink | `docker compose down` |
| View Shlink logs | `docker compose logs -f` |
| Start React app | `npm start` |

## URLs
| Service | URL |
|---------|-----|
| React app | `http://192.168.1.15:3000` |
| Shlink API | `http://192.168.1.15:8080` |
| Short links | `http://192.168.1.15:8080/{shortCode}` |
