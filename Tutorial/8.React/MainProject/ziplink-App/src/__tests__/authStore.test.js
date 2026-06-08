import useAuthStore from '../stores/authStore';

beforeEach(() => {
  localStorage.clear();
  useAuthStore.setState({ user: null });
});

describe('authStore', () => {
  it('starts with null user', () => {
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('login sets user', () => {
    useAuthStore.getState().login('alice@test.com');
    expect(useAuthStore.getState().user).toEqual({ email: 'alice@test.com' });
  });

  it('logout clears user', () => {
    useAuthStore.getState().login('alice@test.com');
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('persists to localStorage (shlink_session key)', () => {
    useAuthStore.getState().login('persist@test.com');

    const raw = localStorage.getItem('shlink_session');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw);
    expect(parsed.state.user).toEqual({ email: 'persist@test.com' });
  });

  it('persists null user to localStorage on logout', () => {
    useAuthStore.getState().login('persist@test.com');
    useAuthStore.getState().logout();

    const raw = localStorage.getItem('shlink_session');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw);
    expect(parsed.state.user).toBeNull();
  });
});
