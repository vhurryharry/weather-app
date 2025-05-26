import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/metricConvert";
import type { MetricTypes, WeatherData } from "../../utils/types";

interface Props {
  weather?: WeatherData;
  metric: MetricTypes;
}

const WeatherCard = ({ weather, metric }: Props) => {
  const convertTemperature = (k: number) =>
    metric === "celsius" ? kelvinToCelsius(k) : kelvinToFahrenheit(k);

  const curWeather = weather?.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${curWeather?.icon ?? "02d"}@2x.png`;

  return (
    <>
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
    </>
  );
};

export default WeatherCard;
