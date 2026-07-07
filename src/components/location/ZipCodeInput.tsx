import Select from "react-select";
import { useLocationContext } from "../../contexts/LocationContext";
import { countryOptions } from "../../utils/locationUtils";
import { validateZipCode, validateCountry } from "../../utils/validation";

const ZipCodeInput = () => {
  const { location, setLocation } = useLocationContext();

  const zipError =
    location.zipcode !== undefined ? validateZipCode(location.zipcode) : null;
  const countryError =
    location.country !== undefined ? validateCountry(location.country) : null;

  return (
    <>
      <label>
        Enter zip code:
        <input
          placeholder="e.g., 10001"
          value={location.zipcode ?? ""}
          onChange={(e) =>
            setLocation({
              ...location,
              zipcode: e.target.value,
              lat: "",
              lon: "",
            })
          }
          className="p-1 m-2 border-1 rounded-xs"
          aria-invalid={zipError ? true : undefined}
        />
      </label>
      {zipError && <p className="text-red-500 text-sm ml-2">{zipError}</p>}
      <label className="flex flex-row items-center mt-2">
        Country:
        <Select
          options={countryOptions}
          placeholder="e.g., Canada"
          className="ml-2 f-1 min-w-xs"
          value={
            location.country
              ? countryOptions.find((o) => o.value === location.country) ?? null
              : null
          }
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
      {countryError && (
        <p className="text-red-500 text-sm ml-2">{countryError}</p>
      )}
    </>
  );
};

export default ZipCodeInput;
