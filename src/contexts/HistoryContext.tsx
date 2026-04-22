import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Location } from "./LocationContext";
import type { WeatherData } from "../utils/types";

export interface HistoryEntry {
  location: Location;
  timestamp: number;
  weatherData?: WeatherData;
}

interface HistoryContextType {
  entries: HistoryEntry[];
  addEntry: (entry: HistoryEntry) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const STORAGE_KEY = "weather-app:search-history";
const MAX_ENTRIES = 10;

const loadEntries = (): HistoryEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is HistoryEntry =>
        !!e && typeof e === "object" && "location" in e && "timestamp" in e
    );
  } catch {
    return [];
  }
};

const isSameLocation = (a: Location, b: Location): boolean => {
  if (a.type !== b.type) return false;
  if (a.type === "coordinates")
    return a.lat === b.lat && a.lon === b.lon;
  if (a.type === "city")
    return (
      a.city === b.city && a.country === b.country && a.state === b.state
    );
  if (a.type === "zip")
    return a.zipcode === b.zipcode && a.country === b.country;
  return false;
};

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entries, setEntries] = useState<HistoryEntry[]>(() => loadEntries());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore storage errors (quota, private mode, etc.)
    }
  }, [entries]);

  const addEntry = useCallback((entry: HistoryEntry) => {
    setEntries((prev) => {
      const deduped = prev.filter((e) => !isSameLocation(e.location, entry.location));
      return [entry, ...deduped].slice(0, MAX_ENTRIES);
    });
  }, []);

  const clearHistory = useCallback(() => setEntries([]), []);

  return (
    <HistoryContext.Provider value={{ entries, addEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context)
    throw new Error("useHistoryContext must be used within HistoryProvider");
  return context;
};
