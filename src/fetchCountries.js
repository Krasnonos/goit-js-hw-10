export function fetchCountries(countryName) {
  const urlForSearch = `https://restcountries.com/v3.1/name/${countryName}`;
  return fetch(urlForSearch).then(resault => resault.json());
}
