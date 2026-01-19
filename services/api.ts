import { IpApiResponse, WeatherResponse, SupportedLang } from '../types';

// IP-API.com endpoint (HTTP only for free tier)
const IP_API_BASE = 'http://ip-api.com/json/';
// Fallback provider that supports HTTPS (ipwho.is)
const FALLBACK_API_BASE = 'https://ipwho.is/';

const FIELDS = 'status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query,mobile,proxy,hosting';

export const fetchIpData = async (ipQuery: string = '', lang: SupportedLang = 'en'): Promise<IpApiResponse> => {
  const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';

  try {
    if (isHttps) {
      throw new Error("Mixed Content: Cannot use http://ip-api.com from https origin.");
    }

    // ip-api.com supports lang parameter directly (e.g., zh-CN, es, fr, de, ja, ru)
    const response = await fetch(`${IP_API_BASE}${ipQuery}?fields=${FIELDS}&lang=${lang}`);
    if (!response.ok) {
      throw new Error(`IP Fetch Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status === 'fail') {
      throw new Error(data.message || 'Failed to resolve IP');
    }
    return data;

  } catch (error) {
    console.warn("Primary API (ip-api.com) unavailable or blocked, attempting fallback...", error);

    try {
      // ipwho.is also supports 'lang' but sometimes codes differ slightly. 
      // It supports 'en', 'de', 'es', 'fr', 'ja', 'pt-BR', 'ru', 'zh-CN'
      const response = await fetch(`${FALLBACK_API_BASE}${ipQuery}?lang=${lang}`);
      if (!response.ok) {
        throw new Error(`Fallback IP API Error: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message || 'Failed to resolve IP');
      }

      return {
        query: data.ip,
        status: 'success',
        country: data.country,
        countryCode: data.country_code,
        region: data.region_code,
        regionName: data.region,
        city: data.city,
        zip: data.postal,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timezone.id,
        isp: data.connection.isp,
        org: data.connection.org,
        as: data.connection.asn ? `AS${data.connection.asn} ${data.connection.org}` : '',
        mobile: undefined, 
        proxy: undefined, 
        hosting: undefined
      };
    } catch (fallbackError: any) {
      console.error("Fallback IP API Error:", fallbackError);
      
      let msg = fallbackError.message || "Failed to fetch IP data from any provider.";
      
      // "Script error." is often a masked CORS error or AdBlocker issue in some browsers
      if (msg === 'Script error.' || msg === 'Failed to fetch' || msg.includes('NetworkError')) {
          msg = "Network request blocked. Please check your connection or disable ad-blockers/privacy extensions.";
      }
      
      throw new Error(msg);
    }
  }
};

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherResponse> => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather Fetch Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Weather API Error:", error);
    // Don't throw for weather, just return null handling in UI is better or let it bubble if critical
    throw error;
  }
};