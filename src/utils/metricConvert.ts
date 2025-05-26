export const kelvinToCelsius = (k: number): string =>
  (k - 273.15).toFixed(1) + "°C";
export const kelvinToFahrenheit = (k: number): string =>
  (((k - 273.15) * 9) / 5 + 32).toFixed(1) + "°F";
