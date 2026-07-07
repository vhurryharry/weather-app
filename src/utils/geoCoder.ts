import axios from "axios";
import type { Location } from "../contexts/LocationContext";
import { memoizeAsync } from "./cache";

const GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const ZIP_URL = "https://api.openweathermap.org/geo/1.0/zip";

const API_KEY = import.meta.env.VITE_API_KEY;

const GEOCODE_TTL_MS = 24 * 60 * 60 * 1000;

export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const formatLocation = (
  locationArr: Array<string | undefined>
): string => {
  return locationArr.filter(Boolean).join(",");
};

const geoDecodeImpl = async (
  location: Location,
  limit: number = 5
): Promise<GeoLocation[]> => {
  if (location.type === "zip") {
    const response = await axios.get(ZIP_URL, {
      params: {
        zip: formatLocation([location.zipcode, location.country]),
        appid: API_KEY,
        limit,
      },
    });

    const data = response.data;
    return [
      {
        name: data.name,
        lat: data.lat,
        lon: data.lon,
        country: data.country,
      },
    ];
  } else {
    const response = await axios.get<GeoLocation[]>(GEOCODE_URL, {
      params: {
        q: formatLocation([location.city, location.state, location.country]),
        appid: API_KEY,
        limit,
      },
    });
    return response.data;
  }
};

export const geoDecode = memoizeAsync(
  geoDecodeImpl,
  (location, limit = 5) =>
    `${location.type}|${location.city ?? ""}|${location.zipcode ?? ""}|${
      location.country ?? ""
    }|${limit}`,
  GEOCODE_TTL_MS
);
