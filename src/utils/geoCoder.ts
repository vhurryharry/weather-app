import axios from "axios";
import type { Location } from "../contexts/LocationContext";

const GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const ZIP_URL = "https://api.openweathermap.org/geo/1.0/zip";

const API_KEY = import.meta.env.VITE_API_KEY;

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

export const geoDecode = async (
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
        q: formatLocation([location.city, location.country]),
        appid: API_KEY,
        limit,
      },
    });
    return response.data;
  }
};
