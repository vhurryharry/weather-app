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

const LocationInput = () => {
  const { location, setLocation } = useLocationContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geoLocations, setGeoLocations] = useState<GeoLocation[]>([]);

  const changeLocationType = (newType: LocationTypes) => {
    setLocation({
      type: newType,
      lat: "",
      lon: "",
    });
  };

  const onValidate = () => {
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
          <button className="btn mr-4" onClick={onValidate}>
            Validate Location
          </button>
          {loading && <Loader />}
        </div>
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
              <option value={index}>
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
