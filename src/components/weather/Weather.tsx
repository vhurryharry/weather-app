import { useState } from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import { getCurrentWeather } from "../../utils/getCurrentWeather";
import Loader from "../Loader";
import type { MetricTypes, WeatherData } from "../../utils/types";
import WeatherCard from "./WeatherCard";

const Weather = () => {
  const { location } = useLocationContext();
  const [weather, setWeather] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricTypes>("celsius");

  const fetchWeather = () => {
    if (location && location.lat && location.lon) {
      setError(null);
      setLoading(true);
      getCurrentWeather(location)
        .then((data) => {
          setWeather(data);
          console.log(data);
        })
        .catch((err) => {
          setError(`Failed to fetch weather data. ${err.message}`);
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center my-4">
        <button
          className="btn mr-4"
          onClick={fetchWeather}
          disabled={!location.lat || !location.lon}
        >
          Get Current Weather
        </button>
        {loading && <Loader />}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <WeatherCard weather={weather} metric={metric} />

      <label className="my-4">
        Metric Type:
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as MetricTypes)}
          className="ml-4"
        >
          <option value="fahrenheit">Fahrenheit</option>
          <option value="celsius">Celsius</option>
        </select>
      </label>
    </div>
  );
};

export default Weather;
