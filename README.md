# Weather App

You can search for current weather conditions by city name, zip code, or coordinates using the https://openweathermap.org/api API.

## Technologies Used

- React.js
- Typescript
- React Context
- Axios
- OpenWeather API
- Tailwind CSS

## How to run

```
yarn install
yarn dev
```

You need to provide the OpenWeather API Key as `VITE_API_KEY` in the `.env` file.

## App Flow

- Select a location type: `City Name`, `Zip Code`, or `Coordinates`.
- For `City Name` or `Zip Code`:
  - Click `Validate Location` to fetch matching locations.
  - Choose one of the suggested results.
- For `Coordinates`:
  - Enter latitude and longitude directly.
- Click `Get Current Weather` to retrieve and display the weather.
- Choose your preferred unit: `Celsius` or `Fahrenheit`.

## Architecture

- `components`: individual components that were used to get user input/display information
  - `location`: components for location input
  - `weather`: components for weather display
  - `Loader`: loader component
- `contexts`: app contexts that were used in the application
  - `LocationContext`: manage location input across the application
- `pages`: page components
  - `Home`: Landing page (currently the only page)
- `utils`: utility functions/types
  - `geoCoder`: using OpenWeather's geocoding API to get lat/lon from city name/zip code
  - `getCurrentWeather`: call OpenWeather API to get current weather for given lat/lon
  - `locationUtils`: available country list with codes
  - `metricConvert`: kelvin to fahrenheit, kelvin to celcius converters (OpenWeather API has the functionality to set `metric` as API parameter, but it's much more efficient to do the client side conversion, especially regarding the number of API calls.)
  - `types`: type definitions for weather data

### Todos

- Input validation
- `State` select dropdown
- Cache API results for better performance
- Search history
- `Use my location` feature
