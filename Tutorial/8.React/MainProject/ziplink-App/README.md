# Ziplink — URL Shortener Dashboard

A React SPA that shortens URLs via a self-hosted Shlink API. Features user registration, per-user link management, search/sort/pagination, QR codes, and clipboard copy — all backed by browser localStorage.

## Tech Stack

**Core:** React 19, React Router DOM 7, Create React App 5, Bootstrap 5.3.3, Zustand 5, bcryptjs 2.4  
**APIs:** Shlink (self-hosted), Google Favicons, QR Server  
**Infra:** Docker (Shlink), localStorage

## Quick Start

```bash
npm install
npm start            # Dev server on :3000
```

Shlink backend required — see `docker-compose.yml`.

## Project Structure

```
src/
├── stores/          # Zustand state (authStore, linksStore)
├── components/      # Reusable UI (Navbar, LinkTable, ModalWrapper, etc.)
├── images/          # Custom logo
├── auth.js          # Auth service (bcrypt hashing)
├── shlink.js        # Shlink API client
├── utils.js         # Helpers + constants
├── Dashboard.js     # Orchestrator (~100 lines)
├── Login.js         # Login page
└── Register.js      # Register page
```

## Features

- Register / Login with bcrypt-hashed passwords
- URL shortening via Shlink API
- Preview & edit before saving
- Search, sort (Ascending/Descending), pagination
- Copy to clipboard with visual feedback
- QR code (sidebar + modal)
- Delete confirmation dialog
- 5-link limit with Pro upgrade upsell (demo)
- Violet-blue gradient navbar with custom logo

## Key Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm test` | Run tests |

## Auth Flow

Passwords are hashed with bcryptjs (10 rounds) before storing in `localStorage['shlink_users']`. Old plaintext passwords are auto-upgraded on next successful login. Session is managed reactively via Zustand persist middleware.

## State Management

Two Zustand stores:
- **authStore** — persisted to `shlink_session`, provides reactive `user` state + `login`/`logout`
- **linksStore** — CRUD with auto-save to per-user localStorage keys (`shlink_links_{email}`)

Both stores eliminate prop drilling — Navbar and Sidebar read stores directly.

## Notes

- Self-contained demo — no backend database
- All data persists in browser localStorage only
- API key hardcoded — not for production use
