import axios from "axios";
import type { Location } from "../contexts/LocationContext";
import { memoizeAsync } from "./cache";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY;

const WEATHER_TTL_MS = 5 * 60 * 1000;

const roundCoord = (value?: string): string => {
  if (!value) return "";
  const num = Number(value);
  if (!Number.isFinite(num)) return value;
  return num.toFixed(2);
};

const getCurrentWeatherImpl = async (location: Location) => {
  const resp = await axios.get(API_URL, {
    params: {
      lat: location.lat,
      lon: location.lon,
      appid: API_KEY,
    },
  });
  return resp.data;
};

export const getCurrentWeather = memoizeAsync(
  getCurrentWeatherImpl,
  (location) => `${roundCoord(location.lat)},${roundCoord(location.lon)}`,
  WEATHER_TTL_MS
);
