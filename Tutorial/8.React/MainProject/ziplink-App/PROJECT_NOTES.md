# Ziplink — URL Shortener Dashboard

## Project Working Notes & Code Flow

---

## 1. Tech Stack

### Core
| Tech | Version | Purpose |
|------|---------|---------|
| React | 19 | UI library |
| React Router DOM | 7 | Client-side routing |
| Create React App | 5 | Build tooling |
| Bootstrap | 5.3.3 | CSS grid, tables, modals, pagination, dropdowns |
| Bootstrap Icons | 1.11.3 | All UI icons |
| Google Fonts | — | Poppins (primary) |
| Zustand | 5 | State management (auth + links stores) |
| bcryptjs | 2.4 | Password hashing |

### External APIs
| API | Endpoint | Used For |
|-----|----------|----------|
| Shlink (self-hosted) | `POST /rest/v3/short-urls` | Creating short URLs |
| Google Favicons | `//www.google.com/s2/favicons` | Link row favicons |
| QR Server | `//api.qrserver.com/v1/create-qr-code` | Generating QR code images |

### Infrastructure
| Service | Tool | Details |
|---------|------|---------|
| Docker | Shlink | `shlinkio/shlink:stable`, port 8080, SQLite, API key `my-api-key-123` |
| Storage | localStorage | User accounts, session, per-user links (no backend DB) |

---

## 2. File Structure

```
ziplink-App/
├── docker-compose.yml          # Shlink container config
├── package.json                # Dependencies & scripts
├── public/
│   └── index.html              # HTML entry, CDN links, Bootstrap
└── src/
    ├── index.js                # React entry: BrowserRouter + App
    ├── App.js                  # Root router with auth guard
    ├── auth.js                 # localStorage auth service (bcrypt hashing)
    ├── shlink.js               # Shlink API client
    ├── utils.js                # Shared helpers + constants
    ├── Dashboard.js            # Orchestrator (~100 lines)
    ├── Login.js                # Login page
    ├── Register.js             # Register page
    ├── auth.css                # Login/Register styles
    ├── dashboard.css           # Dashboard styles + QR skeleton
    ├── stores/
    │   ├── authStore.js        # Zustand persist — user session
    │   └── linksStore.js       # Zustand — links CRUD + localStorage sync
    ├── components/
    │   ├── Navbar.js           # Top nav with gradient + logo + profile
    │   ├── AddLinkForm.js      # URL input + clear + submit
    │   ├── LinkTable.js        # Table with favicons, actions, copy
    │   ├── Pagination.js       # Page controls + show-all
    │   ├── Sidebar.js          # Total links + QR card
    │   ├── ModalWrapper.js     # Reusable modal shell (Escape key)
    │   ├── QrModal.js          # Full-screen QR popup
    │   ├── EditLinkModal.js    # Preview + edit link modal
    │   ├── ProModal.js         # Upgrade upsell modal
    │   └── ConfirmModal.js     # Delete confirmation dialog
    ├── images/
    │   └── zipllinklogo.png    # Custom Z-shaped logo
    └── ...                     # CRA boilerplate (index.css, etc.)
```

---

## 3. Route Map

| Path | Component | Auth Needed | Behavior |
|------|-----------|-------------|----------|
| `/login` | Login | No | Login form |
| `/register` | Register | No | Signup form |
| `/dashboard` | Dashboard | **Yes** | Main URL shortener |
| `*` | — | No | Redirects to `/dashboard` |

**Auth guard** (`ProtectedRoute` in `App.js`): checks `useAuthStore(s => s.user)` → if falsy, redirects to `/login`. Reactive — re-renders on auth state change.

---

## 4. Auth Flow (auth.js + authStore.js)

### Data in localStorage

| Key | Format | Purpose |
|-----|--------|---------|
| `shlink_users` | `[{email, password (bcrypt)}, ...]` | Registered users (hashed) |
| `shlink_session` | `{"email": "..."}` | Current session (Zustand persist) |

### Register
```
Register.js → registerUser(email, pw)
  → reads localStorage["shlink_users"]
  → checks duplicate email
  → bcrypt.hash(pw, 10) → pushes {email, hashed}
  → saves
  → returns {ok: true/false, error?: string}
```

### Login
```
Login.js → loginUser(email, pw)
  → reads localStorage["shlink_users"]
  → finds user by email
  → if stored pw starts with "$2" → bcrypt.compare(pw, hash)
  → else (old plaintext) → direct compare + upgrade to bcrypt on match
  → on match: authStore.login(email) → Zustand persist writes localStorage["shlink_session"]
  → returns {ok: true/false, error?: string}
```

### Session Check
```
useAuthStore(s => s.user) → reactive — component re-renders on login/logout
  → Zustand persist hydrates from localStorage["shlink_session"]
```

### Logout
```
Dashboard → authStore.logout() → Zustand clears persist → removes localStorage["shlink_session"]
  → navigate('/login')
```

---

## 5. Link Storage (linksStore.js)

Each user's links are stored under a unique localStorage key:

```
getLinksKey(email) → "shlink_links_<email>"
  e.g. "shlink_links_alice@gmail.com"
```

### Link Object Shape
```json
{
  "short": "http://192.168.1.15:8080/abc123",
  "long": "https://example.com/page",
  "title": "Page Title",
  "date": "2026-06-07T14:30:00.000Z"
}
```

### CRUD Flow
- **Load**: Dashboard mounts → `loadLinks(user.email)` reads from correct key
- **Create**: `addLink(link)` → prepends + auto-saves to localStorage
- **Update**: `updateLink(updated)` → replaces matching short + auto-saves
- **Delete**: `deleteLink(short)` → filters out + auto-saves
- No manual `useEffect` needed — store actions call `saveLinks()` internally

---

## 6. All Features — How They Work

### 6.1 URL Shortening
1. User pastes URL → clicks "+ Add Link"
2. `handleShorten()` checks 5-link limit (skips for `prodemo@gmail.com`)
3. Calls `shlink.js → shortenUrl()` → `POST /rest/v3/short-urls` with `findTitle: true`
4. Shlink returns `{ shortUrl, longUrl, title }`
5. Title cleaned (`cleanTitle()`: strips HTML, collapses whitespace)
6. Short URL normalized to always use `192.168.1.15:8080` base
7. **EditLinkModal** opens (mode="preview") — user can edit title/URL before saving
8. On confirm → `addLink()` prepends to store → auto-persisted to localStorage

### 6.2 Preview & Confirm
- Modal shows editable Title + Original URL fields
- Save → `addLink()` creates `{ short, long, title, date }` and prepends
- Cancel → discards, closes modal

### 6.3 Link Table
- Columns: Title (favicon + truncated title + domain), Short Link (clickable), Added On (formatted date), Actions
- Clicking a row → highlights it (`.table-primary`) → shows QR in sidebar
- Clicking outside the table → clears selection
- `key={link.short}` — stable keys (no array index)

### 6.4 Search
- Filters by `title.toLowerCase().includes(query)` OR `long.toLowerCase().includes(query)`
- Resets to page 1 on every keystroke
- Results memoized with `useMemo`

### 6.5 Sort
- Dropdown: Descending / Ascending (by date field)
- `useMemo` — only recalculates when `links`, `search`, or `sort` change

### 6.6 Pagination
- `PER_PAGE = 3` links per page
- Previous / page numbers / Next buttons
- "Show All" expands to full list, button toggles to "Paginate"
- Display text: "Showing X to Y of Z links"

### 6.7 Edit Link
- Pencil icon → EditLinkModal (mode="edit") with title + URL fields
- Save → `updateLink()` replaces matching `short` in store → auto-saves

### 6.8 Delete Link
- Trash icon → sets `deleteTarget` → **ConfirmModal** appears
- "Are you sure you want to delete '{title}'?" with Cancel / Delete buttons
- Confirm → `deleteLink(short)` removes from store → auto-saves

### 6.9 Copy to Clipboard
- Clipboard icon in table actions row
- Click → `navigator.clipboard.writeText(shortUrl)` + shows "Copied!" text for 1.5s

### 6.10 QR Code — Sidebar
- Click table row → `selectedLink` set
- Sidebar card shows: favicon, title, QR image (150×150 via `api.qrserver.com`), short URL
- **Skeleton loader**: 15 violet squares pulse with staggered delays while image loads
- Placeholder: "Click a link to show QR" when nothing selected

### 6.11 QR Code — Modal
- QR button in table row → `qrLink` set → QrModal opens
- Shows spinner while 200×200 image loads
- Close button, backdrop click, or Escape key dismisses

### 6.12 5-Link Limit & Pro Modal
- Non-pro users (`email !== 'prodemo@gmail.com'`) limited to 5 links
- On 6th attempt → Pro modal appears:
  - Stars icon, title "Upgrade to Pro", message about limit
  - "Subscribe Now — $4.99/mo" (UI only, no-op)
  - "Maybe later" dismisses

### 6.13 Profile Dropdown
- Avatar circle shows first letter of email
- Bootstrap dropdown: email, plan label ("Pro Plan" with crown / "Basic Plan"), divider, Logout
- `data-bs-toggle="dropdown"` (Bootstrap JS handles toggle)

### 6.14 Logout
- `handleLogout()` → `authStore.logout()` clears session → navigate to `/login`

---

## 7. External API Integration

### Shlink (only create — no read/update/delete)
```
POST http://192.168.1.15:8080/rest/v3/short-urls
Headers: X-Api-Key: my-api-key-123, Content-Type: application/json
Body: { longUrl: "...", findTitle: true }
Response: { shortUrl: "...", longUrl: "...", title: "..." }
```

### Google Favicons
```
GET https://www.google.com/s2/favicons?domain=<domain>&sz=<16|32>
```

### QR Server
```
GET https://api.qrserver.com/v1/create-qr-code/?size=<WxH>&data=<encodedURL>
```

---

## 8. Skills Used

| Skill | Where |
|-------|-------|
| **React Hooks** — `useState`, `useEffect`, `useCallback`, `useMemo` | All components, Dashboard orchestration |
| **React Router** — `Routes`, `Route`, `Navigate`, `useNavigate`, `Link`, `BrowserRouter` | App.js, Login.js, Register.js |
| **Zustand** — `create`, `persist` middleware, `subscribe` | authStore.js, linksStore.js |
| **bcrypt** — `hash`, `compare` | auth.js (password hashing + migration) |
| **Conditional rendering** — `{condition && ...}`, ternary | Dashboard.js (modals, table, pagination, sidebar) |
| **Controlled form inputs** — `value` + `onChange` | Add URL, search, edit modals |
| **localStorage** — `getItem`, `setItem`, `removeItem` | auth.js, linksStore.js |
| **Async/await** — API calls with try/catch/finally | `handleShorten()` |
| **Array methods** — `filter`, `map`, `sort`, `find`, `slice`, `push` | Dashboard.js (CRUD, search, sort, pagination) |
| **Component composition** — reusable ModalWrapper, EditLinkModal | components/ |
| **Clipboard API** — `navigator.clipboard.writeText` | LinkTable.js |
| **Bootstrap 5** — grid, cards, tables, modals, pagination, dropdowns, forms, spinner | All UI |
| **Bootstrap Icons** — 10+ icons used | Throughout |
| **CSS animations** — `@keyframes`, `animation-delay` | QR skeleton (`qrPulse`) |
| **CSS gradients** — `linear-gradient(135deg, #7C3AED, #3B82F6)` | Navbar, buttons, icons, active states |
| **CSS transitions** — hover effects on buttons, inputs | auth.css, dashboard.css |
| **Media queries** — `@media(max-width: 768px)` for mobile | auth.css |
| **SVG** — inline `<rect>` elements for QR skeleton | Sidebar.js |
| **URL parsing** — `new URL()`, `hostname`, `pathname` | `extractDomain()`, `normalizeShortUrl()` |
| **Date formatting** — `toLocaleDateString('en-GB', ...)` | Table "Added On" column |
| **Docker Compose** — Shlink container with SQLite volume | docker-compose.yml |
| **Error handling** — try/catch, onError on images, optional chaining | Throughout |

---

## 9. Key Constants

| Constant | Value | Location |
|----------|-------|----------|
| `SHLINK_BASE` | `http://192.168.1.15:8080` | shlink.js, utils.js |
| `API_KEY` | `my-api-key-123` | shlink.js |
| `PER_PAGE` | `3` | utils.js |
| `USERS_KEY` | `shlink_users` | auth.js |
| `SESSION_KEY` | `shlink_session` | authStore.js (Zustand persist) |
| Pro user email | `prodemo@gmail.com` | Dashboard.js (hardcoded) |

---

## 10. Component Tree

```
<BrowserRouter>                      (index.js)
  <App>                              (App.js)
    ├── /login → <Login />           (Login.js → auth.css)
    ├── /register → <Register />     (Register.js → auth.css)
    └── /dashboard →
      <ProtectedRoute>               (App.js — reads useAuthStore)
        <Dashboard>                  (Dashboard.js — ~100 lines)
          ├── <QrModal />            (full-screen QR popup)
          ├── <EditLinkModal />      (mode="preview" — new link)
          ├── <EditLinkModal />      (mode="edit" — existing link)
          ├── <ProModal />           (upgrade upsell)
          ├── <ConfirmModal />       (delete confirmation)
          ├── <Navbar>               (gradient + Z logo + profile)
          ├── <AddLinkForm />        (URL input + submit)
          ├── Search + Sort bar      (inline JSX)
          ├── <LinkTable />          (favicons, copy, actions)
          ├── <Pagination />         (page controls)
          └── <Sidebar>              (total links + QR card)
```

---

## 11. Data Flow Diagram

```
User Action                   Component              Storage/API
────────────                  ─────────               ──────────
Register form submit    →     Register.js       →    localStorage["shlink_users"]
                                                    bcrypt.hash(password)

Login form submit       →     Login.js           →   localStorage["shlink_users"]
                            authStore.login()    →   Zustand persist writes
                                                    localStorage["shlink_session"]

Paste URL + click Add   →     Dashboard.js       →   Shlink API (POST /short-urls)
                            EditLinkModal shown  ←   { shortUrl, longUrl, title }
User confirms preview   →     linksStore.addLink()  → localStorage["shlink_links_{email}"]
Load dashboard          →     linksStore.loadLinks()← localStorage["shlink_links_{email}"]
Edit link               →     linksStore.updateLink()→ localStorage["shlink_links_{email}"]
Delete link             →     ConfirmModal → linksStore.deleteLink()→ localStorage
Copy short URL          →     LinkTable.js       →   navigator.clipboard.writeText()
Search / sort / page    →     Dashboard.js       →   (computed with useMemo from store)
Click table row         →     Dashboard.js       →   setSelectedLink → QR sidebar
Logout                  →     authStore.logout() →   Zustand clears persist
```

---

## 12. Security Notes (Important for Demo Context)

- **Passwords hashed with bcrypt** (10 salt rounds) — plaintext db upgraded on next login
- **Session** is an email string in localStorage — no tokens, no expiry
- **API key** is hardcoded in `shlink.js` — visible in browser DevTools
- **Per-user isolation** is convention-based (key naming) — not real isolation
- **All data** is in the browser's localStorage — clearing it loses everything
- **No server-side validation** — the app trusts client-side data entirely
