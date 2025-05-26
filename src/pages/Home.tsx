import LocationInput from "../components/location/LocationInput";
import Weather from "../components/weather/Weather";

const Home = () => {
  return (
    <div>
      <h1 className="h1">Check current weather</h1>

      <LocationInput />
      <Weather />
    </div>
  );
};

export default Home;
