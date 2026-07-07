import CitySelector from "./CitySelector";
import ZipCodeInput from "./ZipCodeInput";
import CoordinatesInput from "./CoordinatesInput";
import {
  useLocationContext,
  type LocationTypes,
} from "../../contexts/LocationContext";
import {
  formatLocation,
  geoDecode,
  type GeoLocation,
} from "../../utils/geoCoder";
import { useState } from "react";
import Loader from "../Loader";
import { validateLocation } from "../../utils/validation";

const geolocationErrorMessage = (err: GeolocationPositionError): string => {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return "Location permission was denied. Enable location access in your browser settings to use this feature.";
    case err.POSITION_UNAVAILABLE:
      return "Your current position is unavailable right now. Try again in a moment.";
    case err.TIMEOUT:
      return "Getting your location timed out. Try again.";
    default:
      return err.message || "Failed to determine your current location.";
  }
};

const LocationInput = () => {
  const { location, setLocation } = useLocationContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geoLocations, setGeoLocations] = useState<GeoLocation[]>([]);
  const [geolocating, setGeolocating] = useState(false);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  const changeLocationType = (newType: LocationTypes) => {
    setLocation({
      ...location,
      type: newType,
    });
    setGeoLocations([]);
  };

  const validationError = validateLocation(location);

  const onValidate = () => {
    const err = validateLocation(location);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    setGeoLocations([]);

    geoDecode(location)
      .then((geoLocations) => {
        if (geoLocations.length > 0) {
          setGeoLocations(geoLocations);
          setLocation({
            ...location,
            lat: `${geoLocations[0].lat}`,
            lon: `${geoLocations[0].lon}`,
          });
        } else {
          setError("Incorrect city name/zip code provided.");
        }
      })
      .catch((err) => {
        setError(`Failed to fetch weather data. ${err.message}`);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeolocationError("Geolocation is not supported by your browser.");
      return;
    }
    setGeolocationError(null);
    setGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocating(false);
        setLocation({
          type: "coordinates",
          lat: position.coords.latitude.toString(),
          lon: position.coords.longitude.toString(),
          forceFetch: true,
        });
      },
      (err) => {
        setGeolocating(false);
        setGeolocationError(geolocationErrorMessage(err));
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 60_000 }
    );
  };

  return (
    <div className="flex flex-col">
      <label>
        Location Type:
        <select
          value={location.type}
          onChange={(e) => changeLocationType(e.target.value as LocationTypes)}
          className="ml-4 mb-2"
        >
          <option value="coordinates">Coordinates (lat,lon)</option>
          <option value="city">City Name</option>
          <option value="zip">ZIP Code</option>
        </select>
      </label>

      {location.type === "city" ? (
        <CitySelector />
      ) : location.type === "zip" ? (
        <ZipCodeInput />
      ) : (
        <CoordinatesInput />
      )}
      {location.type !== "coordinates" && (
        <div className="flex flex-row items-center my-4">
          <button
            className="btn mr-4"
            onClick={onValidate}
            disabled={!!validationError}
          >
            Validate Location
          </button>
          {loading && <Loader />}
        </div>
      )}
      <div className="flex flex-row items-center">
        <button
          onClick={getCurrentLocation}
          className="btn mr-4"
          disabled={geolocating}
        >
          {geolocating ? "Locating..." : "Use my location"}
        </button>
        {geolocating && <Loader />}
      </div>
      {geolocationError && (
        <p className="text-red-500 mt-2">{geolocationError}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {geoLocations.length > 0 && (
        <label>
          Select the location:
          <select
            className="ml-4 mb-2"
            onChange={(e) =>
              setLocation({
                ...location,
                lat: `${geoLocations[parseInt(e.target.value)].lat}`,
                lon: `${geoLocations[parseInt(e.target.value)].lon}`,
              })
            }
          >
            {geoLocations.map((gl, index) => (
              <option value={index} key={index + gl.name}>
                {gl.lat}, {gl.lon} (
                {formatLocation([gl.name, gl.state, gl.country])})
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default LocationInput;
