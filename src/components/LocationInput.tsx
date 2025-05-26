import CitySelector from "./CitySelector";
import ZipCodeInput from "./ZipCodeInput";
import CoordinatesInput from "./CoordinatesInput";
import {
  useLocationContext,
  type LocationTypes,
} from "../contexts/LocationContext";

const LocationInput = () => {
  const { location, setLocation } = useLocationContext();

  const changeLocationType = (newType: LocationTypes) => {
    setLocation({
      type: newType,
      location: "",
    });
  };

  return (
    <div className="flex flex-col">
      <label>
        Location Type:
        <select
          value={location?.type}
          onChange={(e) => changeLocationType(e.target.value as LocationTypes)}
          className="ml-4 mb-2"
        >
          <option value="city">City Name</option>
          <option value="zip">ZIP Code</option>
          <option value="coordinates">Coordinates (lat,lon)</option>
        </select>
      </label>

      {location?.type === "city" ? (
        <CitySelector />
      ) : location?.type === "zip" ? (
        <ZipCodeInput />
      ) : (
        <CoordinatesInput />
      )}
    </div>
  );
};

export default LocationInput;
