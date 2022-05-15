import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
var debounce = require('debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  descr: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
  const countryName = e.target.value.trim();
  fetchCountries(countryName).then(checkCountriesQuantity);
}

function checkCountriesQuantity(countriesArrey) {
  const quantity = countriesArrey.length;
  console.log(quantity);
  if (quantity > 10) {
  } else if (quantity >= 2 && quantity <= 10) {
    console.log(quantity);
  } else {
    createMarkupForOneCountry(countriesArrey);
  }
}

function createMarkupForOneCountry(country) {
  const { capital, flags, languages, name, population } = country[0];
}
