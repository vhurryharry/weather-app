import countries from "../assets/countries.json";
import usStates from "../assets/usStates.json";

export const countryOptions = countries.map(({ country, code }) => ({
  value: code,
  label: country,
}));

export const usStateOptions = usStates.map(({ state, code }) => ({
  value: code,
  label: state,
}));
