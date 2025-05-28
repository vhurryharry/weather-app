import { useEffect, useState } from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import { getCurrentWeather } from "../../utils/getCurrentWeather";
import Loader from "../Loader";
import type { MetricTypes, WeatherData } from "../../utils/types";
import WeatherCard from "./WeatherCard";
import { useHistoryContext } from "../../contexts/HistoryContext";

const Weather = () => {
  const { location, setLocation } = useLocationContext();
  const { setHistory, history } = useHistoryContext();
  const [weather, setWeather] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricTypes>("celsius");

  useEffect(() => {
    if (location && location.forceFetch) {
      fetchWeather();

      setLocation({ ...location, forceFetch: false });
    }
  }, [location]);

  const fetchWeather = () => {
    if (location && location.lat && location.lon) {
      setError(null);
      setLoading(true);
      const newLocations = history?.location || [];
      newLocations.push(location);
      if (newLocations.length > 2) {
        newLocations.shift();
      }

      setHistory({
        location: newLocations,
        timestamp: Date.now(),
        weatherData: weather,
      });

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

  const onLastResult = () => {
    if (history) {
      setWeather(history.weatherData);
      setLocation(history.location?.[0]);
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

        <button onClick={onLastResult} disabled={!history} className="btn">
          View Last Result
        </button>
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
