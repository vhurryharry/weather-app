import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LocationProvider } from "./contexts/LocationContext.tsx";
import { HistoryProvider } from "./contexts/HistoryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocationProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </LocationProvider>
  </StrictMode>
);
