export interface LocationData {
  ipCity: string | null;
  ipRegion: string | null;
  ipCountry: string | null;
  ipLat: number | null;
  ipLon: number | null;
  ipTimezone: string | null;
}

export async function getLocationByIP(ip?: string): Promise<LocationData> {
  try {
    const url = process.env.IP_API_URL || "http://ip-api.com/json";
    const response = await fetch(`${url}/${ip || ""}?fields=status,country,regionName,city,lat,lon,timezone`);
    const data = await response.json();

    if (data.status === "success") {
      return {
        ipCity: data.city || null,
        ipRegion: data.regionName || null,
        ipCountry: data.country || null,
        ipLat: data.lat || null,
        ipLon: data.lon || null,
        ipTimezone: data.timezone || null,
      };
    }
  } catch {
    // Silently fail - location is optional
  }

  return {
    ipCity: null,
    ipRegion: null,
    ipCountry: null,
    ipLat: null,
    ipLon: null,
    ipTimezone: null,
  };
}
