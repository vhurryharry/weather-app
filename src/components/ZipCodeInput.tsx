import { useLocationContext } from "../contexts/LocationContext";

const ZipCodeInput = () => {
  const { location, setLocation } = useLocationContext();

  const setZipCode = (zipcode: string) => {
    setLocation({
      type: "zip",
      location: zipcode,
    });
  };

  return (
    <>
      <label>
        Enter zip code:
        <input
          placeholder="e.g., 10001"
          value={location?.location}
          onChange={(e) => setZipCode(e.target.value)}
          className="p-1 m-2 border-1 rounded-xs"
        />
      </label>
    </>
  );
};

export default ZipCodeInput;
