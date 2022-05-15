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
  const countryName = e.target.value;
  fetchCountries(countryName).then(data => console.log(data));
}
