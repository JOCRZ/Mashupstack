// localStorage-based auth: register, login, logout, session, per-user link key

const USERS_KEY = 'shlink_users';
const SESSION_KEY = 'shlink_session';

function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { ok: false, error: 'Email already registered' };
  }
  users.push({ email, password });
  saveUsers(users);
  return { ok: true };
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return { ok: false, error: 'Invalid email or password' };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  return { ok: true };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

// Returns a unique localStorage key per email (e.g. "shlink_links_user@example.com")
// so each user's links are isolated.
export function getLinksKey(email) {
  return `shlink_links_${email}`;
}
