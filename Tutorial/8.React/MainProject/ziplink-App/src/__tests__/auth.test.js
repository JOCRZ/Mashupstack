import { registerUser, loginUser, logoutUser, getCurrentUser, isAuthenticated, getLinksKey } from '../auth';

beforeEach(() => {
  localStorage.clear();
});

describe('registerUser', () => {
  it('registers a new user successfully', async () => {
    const result = await registerUser('test@example.com', 'password123');
    expect(result).toEqual({ ok: true });

    const stored = JSON.parse(localStorage.getItem('shlink_users'));
    expect(stored).toHaveLength(1);
    expect(stored[0].email).toBe('test@example.com');
    expect(stored[0].password).toMatch(/^\$2[ab]\$.{50,}$/);
  });

  it('rejects duplicate email', async () => {
    await registerUser('dup@example.com', 'pass1');
    const result = await registerUser('dup@example.com', 'pass2');
    expect(result).toEqual({ ok: false, error: 'Email already registered' });
  });
});

describe('loginUser', () => {
  it('logs in with correct bcrypt password', async () => {
    await registerUser('user@test.com', 'mypassword');
    const result = await loginUser('user@test.com', 'mypassword');
    expect(result).toEqual({ ok: true });
    expect(JSON.parse(localStorage.getItem('shlink_session'))).toEqual({ email: 'user@test.com' });
  });

  it('rejects wrong password', async () => {
    await registerUser('user@test.com', 'correct-pw');
    const result = await loginUser('user@test.com', 'wrong-pw');
    expect(result).toEqual({ ok: false, error: 'Invalid email or password' });
  });

  it('rejects non-existent user', async () => {
    const result = await loginUser('noone@test.com', 'any');
    expect(result).toEqual({ ok: false, error: 'Invalid email or password' });
  });

  it('migrates plaintext password to bcrypt on login', async () => {
    localStorage.setItem('shlink_users', JSON.stringify([
      { email: 'legacy@test.com', password: 'plaintext-pass' }
    ]));

    const result = await loginUser('legacy@test.com', 'plaintext-pass');
    expect(result).toEqual({ ok: true });

    const users = JSON.parse(localStorage.getItem('shlink_users'));
    expect(users[0].password).toMatch(/^\$2[ab]\$.{50,}$/);
  });

  it('rejects wrong password for plaintext user', async () => {
    localStorage.setItem('shlink_users', JSON.stringify([
      { email: 'legacy@test.com', password: 'plaintext-pass' }
    ]));

    const result = await loginUser('legacy@test.com', 'wrong');
    expect(result).toEqual({ ok: false, error: 'Invalid email or password' });
  });
});

describe('logoutUser', () => {
  it('removes session from localStorage', () => {
    localStorage.setItem('shlink_session', JSON.stringify({ email: 'test@test.com' }));
    logoutUser();
    expect(localStorage.getItem('shlink_session')).toBeNull();
  });
});

describe('getCurrentUser', () => {
  it('returns user from session', () => {
    localStorage.setItem('shlink_session', JSON.stringify({ email: 'test@test.com' }));
    expect(getCurrentUser()).toEqual({ email: 'test@test.com' });
  });

  it('returns null when no session', () => {
    expect(getCurrentUser()).toBeNull();
  });
});

describe('isAuthenticated', () => {
  it('returns true when session exists', () => {
    localStorage.setItem('shlink_session', JSON.stringify({ email: 'a@b.com' }));
    expect(isAuthenticated()).toBe(true);
  });

  it('returns false when no session', () => {
    expect(isAuthenticated()).toBe(false);
  });
});

describe('getLinksKey', () => {
  it('returns scoped localStorage key', () => {
    expect(getLinksKey('user@example.com')).toBe('shlink_links_user@example.com');
  });
});
