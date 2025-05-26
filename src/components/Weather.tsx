import { useState } from "react";
import { useLocationContext } from "../contexts/LocationContext";
import { getCurrentWeather } from "../utils/getCurrentWeather";
import Loader from "./Loader";
import { kelvinToCelsius, kelvinToFahrenheit } from "../utils/metricConvert";

type WeatherData = {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  weather: { main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number; deg: number };
  clouds: { all: number };
  visibility: number;
};

type MetricTypes = "fahrenheit" | "celsius";

const Weather = () => {
  const { location } = useLocationContext();
  const [weather, setWeather] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricTypes>("celsius");

  const convertTemperature = (k: number) =>
    metric === "celsius" ? kelvinToCelsius(k) : kelvinToFahrenheit(k);

  const fetchWeather = () => {
    if (location && location.type && location.location) {
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

  const curWeather = weather?.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${curWeather?.icon ?? "02d"}@2x.png`;

  return (
    <div>
      <div className="max-w-md py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {weather
                ? `${weather.name}${weather.sys?.country ? `, ${weather.sys?.country}` : ""}`
                : "-"}
            </h2>
            <p className="text-gray-500 capitalize">
              {curWeather?.description ?? "-"}
            </p>
          </div>
          <img
            src={iconUrl}
            alt={curWeather?.description}
            className="w-16 h-16"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Temperature</p>
            <p className="text-lg font-medium">
              {weather ? convertTemperature(weather.main.temp) : 0}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Feels Like</p>
            <p className="text-lg font-medium">
              {weather ? convertTemperature(weather.main.feels_like) : 0}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Min / Max</p>
            <p className="text-lg font-medium">
              {weather ? convertTemperature(weather.main.temp_min) : 0} /{" "}
              {weather ? convertTemperature(weather.main.temp_max) : 0}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Humidity</p>
            <p className="text-lg font-medium">
              {weather?.main?.humidity ?? 0}%
            </p>
          </div>
          <div>
            <p className="text-gray-500">Pressure</p>
            <p className="text-lg font-medium">
              {weather?.main?.pressure ?? 0} hPa
            </p>
          </div>
          <div>
            <p className="text-gray-500">Wind</p>
            <p className="text-lg font-medium">
              {weather?.wind?.speed ?? 0} m/s
            </p>
          </div>
          <div>
            <p className="text-gray-500">Visibility</p>
            <p className="text-lg font-medium">
              {((weather?.visibility ?? 0) / 1000).toFixed(1)} km
            </p>
          </div>
          <div>
            <p className="text-gray-500">Cloudiness</p>
            <p className="text-lg font-medium">{weather?.clouds?.all ?? 0}%</p>
          </div>
        </div>
      </div>

      <label className="my-4">
        Metric Type:
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as MetricTypes)}
          className="ml-4 mb-4"
        >
          <option value="fahrenheit">Fahrenheit</option>
          <option value="celsius">Celsius</option>
        </select>
      </label>
      <div className="flex flex-row items-center">
        <button className="btn mr-4" onClick={fetchWeather}>
          Get Current Weather
        </button>
        {loading && <Loader />}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Weather;
