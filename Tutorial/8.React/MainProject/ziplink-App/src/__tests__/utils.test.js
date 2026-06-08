import { cleanTitle, extractDomain, normalizeShortUrl, PER_PAGE, SHORT_BASE } from '../utils';

describe('cleanTitle', () => {
  it('returns null for falsy input', () => {
    expect(cleanTitle(null)).toBeNull();
    expect(cleanTitle(undefined)).toBeNull();
    expect(cleanTitle('')).toBeNull();
  });

  it('strips HTML tags', () => {
    expect(cleanTitle('<b>Hello</b> <i>World</i>')).toBe('Hello World');
  });

  it('collapses whitespace', () => {
    expect(cleanTitle('Hello    World')).toBe('Hello World');
  });

  it('replaces hyphens and pipes with en-dash', () => {
    expect(cleanTitle('foo - bar | baz')).toBe('foo – bar – baz');
  });

  it('trims surrounding whitespace', () => {
    expect(cleanTitle('  Hello World  ')).toBe('Hello World');
  });

  it('handles mixed cases', () => {
    expect(cleanTitle('  <h1>My - Title</h1>  ')).toBe('My – Title');
  });
});

describe('extractDomain', () => {
  it('extracts hostname from URL', () => {
    expect(extractDomain('https://www.example.com/page')).toBe('example.com');
  });

  it('strips www prefix', () => {
    expect(extractDomain('https://www.google.com')).toBe('google.com');
  });

  it('handles URLs without www', () => {
    expect(extractDomain('https://github.com/foo/bar')).toBe('github.com');
  });

  it('returns empty string for invalid URL', () => {
    expect(extractDomain('not-a-url')).toBe('');
  });
});

describe('normalizeShortUrl', () => {
  it('prepends SHORT_BASE to pathname', () => {
    const result = normalizeShortUrl('http://192.168.1.15:8080/abc123');
    expect(result).toBe(`${SHORT_BASE}/abc123`);
  });

  it('strips leading slash from pathname', () => {
    const result = normalizeShortUrl('http://192.168.1.15:8080/xyz');
    expect(result).toBe(`${SHORT_BASE}/xyz`);
  });

  it('returns original URL on invalid input', () => {
    expect(normalizeShortUrl('')).toBe('');
  });
});

describe('constants', () => {
  it('PER_PAGE is 3', () => {
    expect(PER_PAGE).toBe(3);
  });

  it('SHORT_BASE is defined', () => {
    expect(SHORT_BASE).toBe('http://192.168.1.15:8080');
  });
});
