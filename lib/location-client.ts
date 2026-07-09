export interface LocationData {
  ipCity: string | null;
  ipRegion: string | null;
  ipCountry: string | null;
  ipLat: number | null;
  ipLon: number | null;
  ipTimezone: string | null;
}

const CACHE_KEY = '1grow-location-cache';
const CACHE_TTL = 24 * 60 * 60 * 1000;

interface CacheEntry {
  data: LocationData;
  ts: number;
}

function getCache(): LocationData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const entry: CacheEntry = JSON.parse(raw);
      if (Date.now() - entry.ts < CACHE_TTL) return entry.data;
      sessionStorage.removeItem(CACHE_KEY);
    }
  } catch { }
  return null;
}

function setCache(data: LocationData) {
  try {
    const entry: CacheEntry = { data, ts: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch { }
}

function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response> {
  return Promise.race([
    fetch(url),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeoutMs)
    ),
  ]);
}

async function fetchFromIpApi(): Promise<LocationData | null> {
  try {
    const res = await fetchWithTimeout(
      'https://ip-api.com/json/?fields=status,country,regionName,city,lat,lon,timezone'
    );
    const data = await res.json();
    if (data.status === 'success') {
      return {
        ipCity: data.city || null,
        ipRegion: data.regionName || null,
        ipCountry: data.country || null,
        ipLat: data.lat ?? null,
        ipLon: data.lon ?? null,
        ipTimezone: data.timezone || null,
      };
    }
  } catch { }
  return null;
}

async function fetchFromIpApiCo(): Promise<LocationData | null> {
  try {
    const res = await fetchWithTimeout('https://ipapi.co/json/');
    const data = await res.json();
    if (data && data.city) {
      return {
        ipCity: data.city || null,
        ipRegion: data.region || null,
        ipCountry: data.country_name || data.country || null,
        ipLat: data.latitude ?? null,
        ipLon: data.longitude ?? null,
        ipTimezone: data.timezone || null,
      };
    }
  } catch { }
  return null;
}

async function fetchFromIpInfo(): Promise<LocationData | null> {
  try {
    const res = await fetchWithTimeout('https://ipinfo.io/json');
    const data = await res.json();
    if (data && data.city) {
      const [latStr, lonStr] = (data.loc || '').split(',');
      return {
        ipCity: data.city || null,
        ipRegion: data.region || null,
        ipCountry: data.country || null,
        ipLat: latStr ? parseFloat(latStr) : null,
        ipLon: lonStr ? parseFloat(lonStr) : null,
        ipTimezone: data.timezone || null,
      };
    }
  } catch { }
  return null;
}

async function fetchFromBrowser(): Promise<LocationData | null> {
  try {
    const res = await fetchWithTimeout('https://ip-api.com/json/?fields=status,country,regionName,city,lat,lon,timezone');
    const data = await res.json();
    if (data.status === 'success') {
      return {
        ipCity: data.city || null,
        ipRegion: data.regionName || null,
        ipCountry: data.country || null,
        ipLat: data.lat ?? null,
        ipLon: data.lon ?? null,
        ipTimezone: data.timezone || null,
      };
    }
  } catch { }
  return null;
}

const providers = [fetchFromIpApi, fetchFromIpApiCo, fetchFromIpInfo];

export async function fetchLocation(): Promise<LocationData> {
  const cached = getCache();
  if (cached) return cached;

  for (const fetchFn of providers) {
    const result = await fetchFn();
    if (result) {
      setCache(result);
      return result;
    }
  }

  const fallback: LocationData = {
    ipCity: null,
    ipRegion: null,
    ipCountry: null,
    ipLat: null,
    ipLon: null,
    ipTimezone: null,
  };
  setCache(fallback);
  return fallback;
}
