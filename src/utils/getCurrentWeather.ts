import axios from "axios";
import type { Location, LocationTypes } from "../contexts/LocationContext";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getCurrentWeather = async (location: Location) => {
  let params = "";

  switch (location.type) {
    case "zip":
      params = `zip=${[location.location, location.country].join(",")}`;
      break;

    case "city":
      params = `q=${[location.location, location.country].join(",")}`;
      break;

    case "coordinates":
      const [lat, lng] = location.location!.split(",");
      params = `lat=${lat}&lon=${lng}`;
      break;

    default:
      params = `q=${location}`;
  }

  const resp = await axios.get(`${API_URL}?${params}&appid=${API_KEY}`);
  return resp.data;
};
