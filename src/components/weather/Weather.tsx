import { useEffect, useState } from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import { getCurrentWeather } from "../../utils/getCurrentWeather";
import Loader from "../Loader";
import type { MetricTypes, WeatherData } from "../../utils/types";
import WeatherCard from "./WeatherCard";
import { useHistoryContext } from "../../contexts/HistoryContext";
import SearchHistory from "./SearchHistory";

const Weather = () => {
  const { location, setLocation } = useLocationContext();
  const { entries, addEntry } = useHistoryContext();
  const [weather, setWeather] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricTypes>("celsius");

  useEffect(() => {
    if (location && location.forceFetch) {
      fetchWeather();
      setLocation({ ...location, forceFetch: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const fetchWeather = () => {
    if (location && location.lat && location.lon) {
      setError(null);
      setLoading(true);

      getCurrentWeather(location)
        .then((data) => {
          setWeather(data);
          addEntry({
            location,
            timestamp: Date.now(),
            weatherData: data,
          });
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
    const latest = entries[0];
    if (latest) {
      setWeather(latest.weatherData);
      setLocation(latest.location);
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

        <button
          onClick={onLastResult}
          disabled={entries.length === 0}
          className="btn"
        >
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

      <SearchHistory />
    </div>
  );
};

export default Weather;
