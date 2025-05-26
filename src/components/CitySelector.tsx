import Select from "react-select";
import { useLocationContext } from "../contexts/LocationContext";
import { countryOptions } from "../utils/locationUtils";

const CitySelector = () => {
  const { location, setLocation } = useLocationContext();

  const setCity = (city: string) => {
    setLocation({
      ...location,
      location: city,
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
        City:
        <input
          placeholder="e.g., London"
          value={location?.location}
          onChange={(e) => setCity(e.target.value)}
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

export default CitySelector;
