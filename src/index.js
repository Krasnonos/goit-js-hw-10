var debounce = require('debounce');
import Notiflix from 'notiflix';

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
  // .catch(Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function checkCountriesQuantity(countriesArrey) {
  const quantity = countriesArrey.length;
  console.log(quantity);
  if (quantity > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (quantity >= 2 && quantity <= 10) {
    createMarkupForFewCountry(countriesArrey);
  } else {
    createMarkupForOneCountry(countriesArrey);
  }
}

function createMarkupForOneCountry(country) {
  const { flags, name, capital, languages, population } = country[0];

  const langArray = Object.values(country[0].languages);
  const langString = langArray.join(', ');
  const headerMarkup = `<img class="flagImg" src='${flags.png}' alt='${name.official}' /><h1 class='country'>${name.official}</h1>`;
  const descriprionMarkup = `<p class='capital'>${capital}</p><p class='population'>${population}</p><p class='languages'>${langString}</p>`;
  refs.list.innerHTML = headerMarkup;
  refs.descr.innerHTML = descriprionMarkup;
}

function createMarkupForFewCountry(countries) {
  const headerMarkup = countries
    .map(country => {
      const { flags, name, capital } = country;
      return `<img class="flagImg" src='${flags.png}' alt='${name.official}'/><h1 class='country'>${name.official}</h1>`;
    })
    .join(' ');
  refs.list.innerHTML = headerMarkup;
  refs.descr.innerHTML = '';
}
