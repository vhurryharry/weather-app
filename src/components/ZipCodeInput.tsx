import Select from "react-select";
import { useLocationContext } from "../contexts/LocationContext";
import { countryOptions } from "../utils/locationUtils";

const ZipCodeInput = () => {
  const { location, setLocation } = useLocationContext();

  const setZipCode = (zipcode: string) => {
    setLocation({
      ...location,
      location: zipcode,
    });
  };

  const setCountry = (country?: string) => {
    setLocation({
      ...location,
      country,
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
      <label className="flex flex-row items-center mt-2">
        Country:
        <Select
          options={countryOptions}
          placeholder="e.g., Canada"
          className="ml-2 f-1 min-w-xs"
          onChange={(nv) => setCountry(nv?.value)}
        />
      </label>
    </>
  );
};

export default ZipCodeInput;
