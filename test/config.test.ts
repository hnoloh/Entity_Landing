import { describe, it, expect, afterEach } from 'vitest';
import { getApiUrl } from '../src/api/config';

describe('API Configuration', () => {
  const originalEnv = import.meta.env.VITE_API_BASE_URL;

  afterEach(() => {
    import.meta.env.VITE_API_BASE_URL = originalEnv;
  });

  it('should use empty string as fallback when env var is not set', () => {
    delete import.meta.env.VITE_API_BASE_URL;
    expect(getApiUrl('/api/test')).toBe('/api/test');
  });

  it('should prepend the base url when env var is set', () => {
    import.meta.env.VITE_API_BASE_URL = 'https://api.example.com';
    expect(getApiUrl('/api/test')).toBe('https://api.example.com/api/test');
  });
});
