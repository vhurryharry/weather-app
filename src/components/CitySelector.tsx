import Select from "react-select";
import { useLocationContext } from "../contexts/LocationContext";

const CitySelector = () => {
  // const cityOptions = useMemo(() => {
  //   return (cities as Array<City>).map((city: City) => ({
  //     value: city.id,
  //     label: city.name,
  //   }));
  // }, []);
  const { location, setLocation } = useLocationContext();

  const setCity = (city: string) => {
    setLocation({
      type: "city",
      location: city,
    });
  };

  return (
    <>
      <label>
        City:
        {/* <Select
          options={cityOptions}
          placeholder="e.g., London"
          className="mt-2"
        /> */}
        <input
          placeholder="e.g., London"
          value={location?.location}
          onChange={(e) => setCity(e.target.value)}
          className="p-1 m-2 border-1 rounded-xs"
        />
      </label>
    </>
  );
};

export default CitySelector;
