import useLinksStore from '../stores/linksStore';

const mockLink = {
  short: 'http://192.168.1.15:8080/abc123',
  long: 'https://example.com/very/long/url',
  title: 'Example',
  date: '2025-01-01T00:00:00.000Z',
};

beforeEach(() => {
  localStorage.clear();
  useLinksStore.setState({ links: [], storageKey: 'shlink_links_default' });
});

describe('linksStore', () => {
  it('starts with empty links', () => {
    expect(useLinksStore.getState().links).toEqual([]);
  });

  it('loadLinks reads from localStorage by email', () => {
    const key = 'shlink_links_user@test.com';
    localStorage.setItem(key, JSON.stringify([mockLink]));

    useLinksStore.getState().loadLinks('user@test.com');
    const links = useLinksStore.getState().links;
    expect(links).toHaveLength(1);
    expect(links[0].short).toContain('/abc123');
    expect(links[0].title).toBe('Example');
  });

  it('loadLinks with no email uses default key', () => {
    localStorage.setItem('shlink_links_default', JSON.stringify([mockLink]));

    useLinksStore.getState().loadLinks(null);
    expect(useLinksStore.getState().links).toHaveLength(1);
  });

  it('loadLinks empty when no data', () => {
    useLinksStore.getState().loadLinks('empty@test.com');
    expect(useLinksStore.getState().links).toEqual([]);
  });

  it('addLink prepends link and persists', () => {
    useLinksStore.getState().loadLinks('test@test.com');
    useLinksStore.getState().addLink(mockLink);

    const links = useLinksStore.getState().links;
    expect(links).toHaveLength(1);
    expect(links[0].title).toBe('Example');

    const stored = JSON.parse(localStorage.getItem('shlink_links_test@test.com'));
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Example');
  });

  it('addLink adds to beginning of list', () => {
    useLinksStore.getState().loadLinks('test@test.com');
    useLinksStore.getState().addLink({ ...mockLink, short: 'http://192.168.1.15:8080/first' });
    useLinksStore.getState().addLink({ ...mockLink, short: 'http://192.168.1.15:8080/second' });

    expect(useLinksStore.getState().links[0].short).toContain('/second');
  });

  it('addLink sets a date', () => {
    useLinksStore.getState().loadLinks('test@test.com');
    useLinksStore.getState().addLink(mockLink);

    expect(useLinksStore.getState().links[0].date).toBeTruthy();
    expect(() => new Date(useLinksStore.getState().links[0].date)).not.toThrow();
  });

  it('updateLink modifies existing link by short', () => {
    useLinksStore.getState().loadLinks('test@test.com');
    useLinksStore.getState().addLink(mockLink);

    useLinksStore.getState().updateLink({ ...mockLink, title: 'Updated Title' });
    expect(useLinksStore.getState().links[0].title).toBe('Updated Title');
  });

  it('updateLink persists changes', () => {
    useLinksStore.getState().loadLinks('test@test.com');
    useLinksStore.getState().addLink(mockLink);
    useLinksStore.getState().updateLink({ ...mockLink, title: 'Updated Title' });

    const stored = JSON.parse(localStorage.getItem('shlink_links_test@test.com'));
    expect(stored[0].title).toBe('Updated Title');
  });

  it('deleteLink removes link by short', () => {
    useLinksStore.getState().loadLinks('test@test.com');
    useLinksStore.getState().addLink(mockLink);
    expect(useLinksStore.getState().links).toHaveLength(1);

    useLinksStore.getState().deleteLink(mockLink.short);
    expect(useLinksStore.getState().links).toHaveLength(0);
  });

  it('deleteLink persists removal', () => {
    useLinksStore.getState().loadLinks('test@test.com');
    useLinksStore.getState().addLink(mockLink);
    useLinksStore.getState().deleteLink(mockLink.short);

    const stored = JSON.parse(localStorage.getItem('shlink_links_test@test.com'));
    expect(stored).toHaveLength(0);
  });

  it('saveLinks writes current links to localStorage', () => {
    useLinksStore.getState().loadLinks('save@test.com');
    useLinksStore.setState({ links: [mockLink] });
    useLinksStore.getState().saveLinks();

    const stored = JSON.parse(localStorage.getItem('shlink_links_save@test.com'));
    expect(stored).toHaveLength(1);
  });

  it('normalizes short URLs on load', () => {
    const key = 'shlink_links_norm@test.com';
    localStorage.setItem(key, JSON.stringify([
      { short: 'http://other:8080/xyz', long: 'https://x.com', title: 'X', date: '2025-01-01' }
    ]));

    useLinksStore.getState().loadLinks('norm@test.com');
    const links = useLinksStore.getState().links;
    expect(links[0].short).toMatch(/^http:\/\/192\.168\.1\.15:8080\/xyz/);
  });
});
