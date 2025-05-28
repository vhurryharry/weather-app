import React, { createContext, useContext, useState } from "react";

export type LocationTypes = "zip" | "city" | "coordinates";
export interface Location {
  type?: LocationTypes;
  city?: string;
  zipcode?: string;
  lat?: string;
  lon?: string;
  country?: string;
  forceFetch?: boolean;
}

interface LocationContextType {
  location: Location;
  setLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<Location>({
    type: "coordinates",
  });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context)
    throw new Error("useLocationContext must be used within AppProvider");
  return context;
};
