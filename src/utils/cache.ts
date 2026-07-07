interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class TTLCache<T> {
  private store = new Map<string, CacheEntry<T>>();
  constructor(private defaultTTLMs: number) {}

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T, ttlMs?: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTTLMs),
    });
  }

  clear(): void {
    this.store.clear();
  }
}

export const memoizeAsync = <Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  keyFn: (...args: Args) => string,
  ttlMs: number
) => {
  const cache = new TTLCache<R>(ttlMs);
  const wrapped = async (...args: Args): Promise<R> => {
    const key = keyFn(...args);
    const cached = cache.get(key);
    if (cached !== undefined) return cached;
    const value = await fn(...args);
    cache.set(key, value);
    return value;
  };
  return Object.assign(wrapped, { clear: () => cache.clear() });
};
