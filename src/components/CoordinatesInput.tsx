import { useEffect, useState } from "react";
import { useLocationContext } from "../contexts/LocationContext";

const CoordinatesInput = () => {
  const { setLocation } = useLocationContext();
  const [lat, setLat] = useState("0");
  const [lng, setLng] = useState("0");

  useEffect(() => {
    setLocation({
      type: "coordinates",
      location: [lat, lng].join(","),
    });
  }, [lat, lng]);

  return (
    <>
      <label>
        Lat:
        <input
          placeholder="e.g., 37.7749"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="p-1 m-2 border-1 rounded-xs"
        />
      </label>

      <label>
        Lng:
        <input
          placeholder="e.g., -122.4194"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="p-1 m-2 border-1 rounded-xs"
        />
      </label>
    </>
  );
};

export default CoordinatesInput;
