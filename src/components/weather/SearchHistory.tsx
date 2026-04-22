import { useHistoryContext } from "../../contexts/HistoryContext";
import { useLocationContext } from "../../contexts/LocationContext";
import type { HistoryEntry } from "../../contexts/HistoryContext";

const describeEntry = (entry: HistoryEntry): string => {
  const { location } = entry;
  if (location.type === "coordinates")
    return `${location.lat}, ${location.lon}`;
  if (location.type === "city")
    return [location.city, location.state, location.country]
      .filter(Boolean)
      .join(", ");
  if (location.type === "zip")
    return [location.zipcode, location.country].filter(Boolean).join(", ");
  return "(unknown)";
};

const formatTime = (ts: number): string => {
  const date = new Date(ts);
  return date.toLocaleString();
};

const SearchHistory = () => {
  const { entries, clearHistory } = useHistoryContext();
  const { setLocation } = useLocationContext();

  if (entries.length === 0) {
    return (
      <div className="max-w-md py-2">
        <h3 className="h5">Search History</h3>
        <p className="text-gray-500 text-sm">No recent searches yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md py-2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="h5">Search History</h3>
        <button
          onClick={clearHistory}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Clear
        </button>
      </div>
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
        {entries.map((entry) => (
          <li key={entry.timestamp} className="flex items-center justify-between px-3 py-2">
            <div className="flex flex-col">
              <span className="font-medium">{describeEntry(entry)}</span>
              <span className="text-xs text-gray-500">
                {formatTime(entry.timestamp)}
                {entry.weatherData
                  ? ` · ${entry.weatherData.weather?.[0]?.description ?? ""}`
                  : ""}
              </span>
            </div>
            <button
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() =>
                setLocation({ ...entry.location, forceFetch: true })
              }
            >
              Search again
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
