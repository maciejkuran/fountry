import {
  fetchData,
  formatNumber,
  addValueBetweenWords,
  currencyCheck,
  capitalCheck,
  languagesCheck,
} from './helpers.js';
import { COUNTRIES_API, UNSPLASH_API } from './config.js';

//Holds important data
export const state = {
  countryData: {}, // specific country data
  allCountryNames: [], //sorted array of all country names
  mainImg: {},
  sliderImgs: [],
};

//Get all countries in the world
export const getAllCountryNames = async () => {
  try {
    const data = await fetchData(`${COUNTRIES_API}all`, 'Cannot fetch data.');
    data.forEach(object => state.allCountryNames.push(object.name.common));
    state.allCountryNames.sort();
  } catch (err) {
    throw err;
  }
};

//Getting data based on dropdown click and storing to state.countryData object
export const getDataBasedOnDropdownClick = async clickedCountry => {
  try {
    const [data] = await fetchData(
      `${COUNTRIES_API}name/${clickedCountry}`,
      'Cannot fetch data.'
    );
    addPropertiesCountryDataObject(data);
  } catch (err) {
    throw err;
  }
};
//Getting data based on user input and storing to state.countryData object
export const getDataBasedOnInput = async input => {
  try {
    const allResults = await fetchData(
      `${COUNTRIES_API}all`,
      'Cannot fetch data.'
    );
    //prettier-ignore
    const data = allResults.find(country =>
      country.name.common.toLowerCase() === input ||
      country.name.official.toLowerCase() === input
  );

    if (data === undefined) throw new Error('Country not found.');

    addPropertiesCountryDataObject(data);
  } catch (err) {
    throw err;
  }
};

//Helper function - setting properties and values to state.countryData object
const addPropertiesCountryDataObject = data => {
  state.countryData.name = data.name.common;
  state.countryData.nameOfficial = data.name.official;
  state.countryData.flag = data.flags.png;
  state.countryData.coatOfArms = data.coatOfArms.png;
  state.countryData.region = data.region;
  state.countryData.subregion = data.subregion;
  state.countryData.capital = capitalCheck(data);
  state.countryData.area = formatNumber(data.area);
  state.countryData.carSide = data.car.side;
  state.countryData.capitalCoords = data.capitalInfo.latlng;
  state.countryData.timezones = data.timezones.join(', ');
  state.countryData.languages = languagesCheck(data);
  state.countryData.population = formatNumber(data.population);
  state.countryData.currency = currencyCheck(data);
};

//Setting leaflet map
export const loadMap = (coords, city, country) => {
  //Before initializing map check for if the map is already initiated or not
  const container = L.DomUtil.get('map');
  if (container != null) {
    container._leaflet_id = null;
  }

  if (!coords) return;

  const map = L.map('map').setView(coords, 4);

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup(`🌍 ${city}, the capital of ${country}`)
    .openPopup();

  map.scrollWheelZoom.disable();
  map.on('focus', () => {
    map.scrollWheelZoom.enable();
  });
  map.on('blur', () => {
    map.scrollWheelZoom.disable();
  });
};

//Getting unsplash main img
export const getImages = async country => {
  try {
    //Setting state.sliderImgs array to empty
    state.sliderImgs = [];
    //Add %20 if country name contains > 1 word
    const convertedName = addValueBetweenWords(country);
    const data = await fetchData(
      UNSPLASH_API(convertedName),
      'Cannot load images.'
    );

    if (data.results.length === 0) throw new Error('Cannot load images.');

    //Storing data about main image
    state.mainImg.url = data.results[0].urls.regular;
    state.mainImg.author = data.results[0].user.name;
    state.mainImg.authorPage = data.results[0].user.links.html;
    state.mainImg.imgOnUnsplash = data.results[0].links.html;
    state.mainImg.download = data.results[0].links.download;
    //Storing data - slider contains 6 images
    const slideNumbers = [1, 2, 3, 4, 5, 6];

    for (nb of slideNumbers) {
      state.sliderImgs.push({
        //pushing data to state.sliderImgs array
        url: data.results[nb].urls.regular,
        author: data.results[nb].user.name,
        authorPage: data.results[nb].user.links.html,
        download: data.results[nb].links.download,
      });
    }
  } catch (err) {
    throw err;
  }
};
