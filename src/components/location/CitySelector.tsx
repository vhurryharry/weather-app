import Select from "react-select";
import { useLocationContext } from "../../contexts/LocationContext";
import { countryOptions, usStateOptions } from "../../utils/locationUtils";

const CitySelector = () => {
  const { location, setLocation } = useLocationContext();
  const isUS = location.country === "US";

  return (
    <>
      <label>
        City:
        <input
          placeholder="e.g., London"
          value={location.city ?? ""}
          onChange={(e) =>
            setLocation({
              ...location,
              city: e.target.value,
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
          value={
            location.country
              ? countryOptions.find((o) => o.value === location.country) ?? null
              : null
          }
          onChange={(nv) =>
            setLocation({
              ...location,
              country: nv?.value,
              state: nv?.value === "US" ? location.state : undefined,
              lat: "",
              lon: "",
            })
          }
        />
      </label>
      {isUS && (
        <label className="flex flex-row items-center mt-2">
          State:
          <Select
            options={usStateOptions}
            placeholder="e.g., California"
            className="ml-2 f-1 min-w-xs"
            isClearable
            value={
              location.state
                ? usStateOptions.find((o) => o.value === location.state) ?? null
                : null
            }
            onChange={(nv) =>
              setLocation({
                ...location,
                state: nv?.value,
                lat: "",
                lon: "",
              })
            }
          />
        </label>
      )}
    </>
  );
};

export default CitySelector;
