export type WeatherData = {
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

export type MetricTypes = "fahrenheit" | "celsius";
