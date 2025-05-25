import axios from "axios";
import type { LocationTypes } from "../contexts/LocationContext";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getCurrentWeather = async (
  location: string,
  locationType: LocationTypes
) => {
  let params = "";

  switch (locationType) {
    case "zip":
      params = `zip=${location}`;
      break;

    case "city":
      params = `q=${location}`;
      break;

    case "coordinates":
      const [lat, lng] = location.split(",");
      params = `lat=${lat}&lon=${lng}`;
      break;

    default:
      params = `q=${location}`;
  }

  const resp = await axios.get(`${API_URL}?${params}&appid=${API_KEY}`);
  return resp.data;
};
