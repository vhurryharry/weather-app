import Select from "react-select";
import { useLocationContext } from "../../contexts/LocationContext";
import { countryOptions } from "../../utils/locationUtils";

const ZipCodeInput = () => {
  const { location, setLocation } = useLocationContext();

  return (
    <>
      <label>
        Enter zip code:
        <input
          placeholder="e.g., 10001"
          value={location.zipcode}
          onChange={(e) =>
            setLocation({
              ...location,
              zipcode: e.target.value,
              lat: "",
              lon: "",
            })
          }
          className="p-1 m-2 border-1 rounded-xs"
        />
      </label>
      <label className="flex flex-row items-center mt-2">
        Country:
        <Select
          options={countryOptions}
          placeholder="e.g., Canada"
          className="ml-2 f-1 min-w-xs"
          onChange={(nv) =>
            setLocation({
              ...location,
              country: nv?.value,
              lat: "",
              lon: "",
            })
          }
        />
      </label>
    </>
  );
};

export default ZipCodeInput;
