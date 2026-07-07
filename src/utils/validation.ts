import type { Location } from "../contexts/LocationContext";

export const validateLatitude = (value: string | undefined): string | null => {
  if (!value || value.trim() === "") return "Latitude is required.";
  const num = Number(value);
  if (!Number.isFinite(num)) return "Latitude must be a number.";
  if (num < -90 || num > 90) return "Latitude must be between -90 and 90.";
  return null;
};

export const validateLongitude = (value: string | undefined): string | null => {
  if (!value || value.trim() === "") return "Longitude is required.";
  const num = Number(value);
  if (!Number.isFinite(num)) return "Longitude must be a number.";
  if (num < -180 || num > 180) return "Longitude must be between -180 and 180.";
  return null;
};

export const validateCity = (value: string | undefined): string | null => {
  if (!value || value.trim() === "") return "City name is required.";
  if (value.trim().length < 2) return "City name must be at least 2 characters.";
  if (!/^[\p{L}\s'.\-,]+$/u.test(value.trim()))
    return "City name contains invalid characters.";
  return null;
};

export const validateZipCode = (value: string | undefined): string | null => {
  if (!value || value.trim() === "") return "Zip code is required.";
  if (!/^[A-Za-z0-9\s-]{3,10}$/.test(value.trim()))
    return "Zip code format is invalid.";
  return null;
};

export const validateCountry = (value: string | undefined): string | null => {
  if (!value || value.trim() === "") return "Country is required.";
  return null;
};

export const validateLocation = (location: Location): string | null => {
  if (location.type === "coordinates") {
    return validateLatitude(location.lat) ?? validateLongitude(location.lon);
  }
  if (location.type === "city") {
    return validateCity(location.city) ?? validateCountry(location.country);
  }
  if (location.type === "zip") {
    return validateZipCode(location.zipcode) ?? validateCountry(location.country);
  }
  return null;
};
