import React, { createContext, useContext, useState } from "react";
import type { Location } from "./LocationContext";
import type { WeatherData } from "../utils/types";

export interface History {
  location: Location[];
  timestamp?: number;
  weatherData?: WeatherData;
}

interface HistoryContextType {
  history?: History;
  setHistory: (history: History) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [history, setHistory] = useState<History>();

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context)
    throw new Error("useHistoryContext must be used within AppProvider");
  return context;
};
