import { useLocationContext } from "../../contexts/LocationContext";

const CoordinatesInput = () => {
  const { setLocation, location } = useLocationContext();

  return (
    <>
      <label>
        Lat:
        <input
          placeholder="e.g., 37.7749"
          value={location.lat}
          onChange={(e) =>
            setLocation({
              ...location,
              lat: e.target.value,
            })
          }
          className="p-1 m-2 border-1 rounded-xs"
        />
      </label>

      <label>
        Lon:
        <input
          placeholder="e.g., -122.4194"
          value={location.lon}
          onChange={(e) =>
            setLocation({
              ...location,
              lon: e.target.value,
            })
          }
          className="p-1 m-2 border-1 rounded-xs"
        />
      </label>
    </>
  );
};

export default CoordinatesInput;
