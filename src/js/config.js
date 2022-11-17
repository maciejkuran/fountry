//REST Countries API
const COUNTRIES_API = "https://restcountries.com/v3.1/";

//Unsplash
const UNSPLASH_KEY = "Xvy1ucXbSQKDQCsgP6BPJv4t-KDnzZ_FKsffCLnGhyg";

const UNSPLASH_API = (country) =>
  `https://api.unsplash.com/search/photos?query=$${country}&client_id=${UNSPLASH_KEY}`;

//Wikipedia
const WIKIPEDIA_GET_DESC_API = (country) =>
  `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exchars=1200&explaintext&titles=${country}&limit=1`;

const WIKIPEDIA_GET_LINKS_API = (country) =>
  `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&action=opensearch&search=${country}&limit=5&namespace=0`;
