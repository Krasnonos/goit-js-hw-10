export function fetchCountries(countryName) {
  const urlForSearch = `https://restcountries.com/v3.1/name/${countryName}`;
  const urlFilter = 'fields=name,capital,population,flags,languages';
  return fetch(`${urlForSearch}?${urlFilter}`).then(resault => resault.json());
}
