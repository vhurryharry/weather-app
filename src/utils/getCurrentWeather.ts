import axios from "axios";
import type { Location } from "../contexts/LocationContext";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getCurrentWeather = async (location: Location) => {
  const resp = await axios.get(
    `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
  );

  return resp.data;
};
