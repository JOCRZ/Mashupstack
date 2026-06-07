import bcrypt from 'bcryptjs';

const USERS_KEY = 'shlink_users';
const SESSION_KEY = 'shlink_session';

function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function registerUser(email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { ok: false, error: 'Email already registered' };
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  saveUsers(users);
  return { ok: true };
}

export async function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return { ok: false, error: 'Invalid email or password' };
  }

  let match;
  if (user.password.startsWith('$2')) {
    match = await bcrypt.compare(password, user.password);
  } else {
    match = password === user.password;
    if (match) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
      saveUsers(users);
    }
  }

  if (!match) {
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
