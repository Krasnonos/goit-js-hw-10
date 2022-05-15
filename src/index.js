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

  if (countryName === '') {
    refs.list.innerHTML = '';
    refs.descr.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(checkCountriesQuantity)
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function checkCountriesQuantity(countriesArrey) {
  const quantity = countriesArrey.length;

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
  const descriprionMarkup = `<p class='capital'>Capital: ${capital}</p><p class='population'> Population: ${population}</p><p class='languages'>Languages: ${langString}</p>`;

  redrawingMarkup(headerMarkup, descriprionMarkup);
}

function createMarkupForFewCountry(countries) {
  const headerMarkup = countries
    .map(country => {
      const { flags, name } = country;
      return `<img class="flagImg" src='${flags.png}' alt='${name.official}'/><h1 class='country'>${name.official}</h1>`;
    })
    .join(' ');

  redrawingMarkup(headerMarkup);
}

function redrawingMarkup(header, description = '') {
  refs.list.innerHTML = header;
  refs.descr.innerHTML = description;
}
