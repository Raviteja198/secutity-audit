type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const MEMORY_CACHE = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_SECONDS = 180;

function buildKey(scope: string, params: Record<string, string | number | undefined>) {
  const parts = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${scope}:${parts}`;
}

export async function withDashboardCache<T>(scope: string, params: Record<string, string | number | undefined>, fn: () => Promise<T>): Promise<T> {
  const key = buildKey(scope, params);
  const now = Date.now();
  const cached = MEMORY_CACHE.get(key) as CacheEntry<T> | undefined;

  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const result = await fn();
  MEMORY_CACHE.set(key, {
    expiresAt: now + DEFAULT_TTL_SECONDS * 1000,
    value: result,
  });
  return result;
}

export async function invalidateDashboardCache(): Promise<void> {
  MEMORY_CACHE.clear();
}
