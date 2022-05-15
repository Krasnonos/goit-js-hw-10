var debounce = require('debounce');

import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

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
  const { flags, name, capital, languages, population } = country[0];

  const langArray = Object.values(country[0].languages);
  const langString = langArray.join(', ');
  const markUp = `<img class='${flags}' src='${flags.png}' alt='${capital}' /><h1 class='country'>${name.official}</h1><p class='capital'>${capital}</p><p class='population'>${population}</p><p class='languages'>${langString}</p>`;

  refs.list.innerHTML = markUp;
}
