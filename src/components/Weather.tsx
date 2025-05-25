import { useEffect, useState } from "react";
import { useLocationContext } from "../contexts/LocationContext";
import { getCurrentWeather } from "../utils/getCurrentWeather";

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

const kelvinToCelsius = (k: number) => (k - 273.15).toFixed(1);

const Weather = () => {
  const { location } = useLocationContext();
  const [weather, setWeather] = useState<WeatherData>();

  const fetchWeather = () => {
    if (location) {
      getCurrentWeather(location.location, location.type)
        .then((data) => {
          setWeather(data);
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const curWeather = weather?.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${curWeather?.icon}@2x.png`;

  return (
    <div>
      {weather && (
        <div className="max-w-md py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-gray-500 capitalize">
                {curWeather?.description}
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
                {kelvinToCelsius(weather.main.temp)}°C
              </p>
            </div>
            <div>
              <p className="text-gray-500">Feels Like</p>
              <p className="text-lg font-medium">
                {kelvinToCelsius(weather.main.feels_like)}°C
              </p>
            </div>
            <div>
              <p className="text-gray-500">Min / Max</p>
              <p className="text-lg font-medium">
                {kelvinToCelsius(weather.main.temp_min)}° /{" "}
                {kelvinToCelsius(weather.main.temp_max)}°C
              </p>
            </div>
            <div>
              <p className="text-gray-500">Humidity</p>
              <p className="text-lg font-medium">{weather.main.humidity}%</p>
            </div>
            <div>
              <p className="text-gray-500">Pressure</p>
              <p className="text-lg font-medium">{weather.main.pressure} hPa</p>
            </div>
            <div>
              <p className="text-gray-500">Wind</p>
              <p className="text-lg font-medium">{weather.wind.speed} m/s</p>
            </div>
            <div>
              <p className="text-gray-500">Visibility</p>
              <p className="text-lg font-medium">
                {(weather.visibility / 1000).toFixed(1)} km
              </p>
            </div>
            <div>
              <p className="text-gray-500">Cloudiness</p>
              <p className="text-lg font-medium">{weather.clouds.all}%</p>
            </div>
          </div>
        </div>
      )}
      <button className="btn" onClick={fetchWeather}>
        Get Current Weather
      </button>
    </div>
  );
};

export default Weather;
