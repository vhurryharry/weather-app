import countries from "../assets/countries.json";

export const countryOptions = countries.map(({ country, code }) => ({
  value: code,
  label: country,
}));
