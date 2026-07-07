import { useLocationContext } from "../../contexts/LocationContext";
import {
  validateLatitude,
  validateLongitude,
} from "../../utils/validation";

const CoordinatesInput = () => {
  const { setLocation, location } = useLocationContext();

  const latError = location.lat !== undefined ? validateLatitude(location.lat) : null;
  const lonError = location.lon !== undefined ? validateLongitude(location.lon) : null;

  return (
    <>
      <label>
        Lat:
        <input
          placeholder="e.g., 37.7749"
          value={location.lat ?? ""}
          onChange={(e) =>
            setLocation({
              ...location,
              lat: e.target.value,
            })
          }
          className="p-1 m-2 border-1 rounded-xs"
          aria-invalid={latError ? true : undefined}
        />
      </label>
      {latError && <p className="text-red-500 text-sm ml-2">{latError}</p>}

      <label>
        Lon:
        <input
          placeholder="e.g., -122.4194"
          value={location.lon ?? ""}
          onChange={(e) =>
            setLocation({
              ...location,
              lon: e.target.value,
            })
          }
          className="p-1 m-2 border-1 rounded-xs"
          aria-invalid={lonError ? true : undefined}
        />
      </label>
      {lonError && <p className="text-red-500 text-sm ml-2">{lonError}</p>}
    </>
  );
};

export default CoordinatesInput;
