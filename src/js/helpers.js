//Helper for fetching and parsing data
export const fetchData = async url => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

//Formatting number (used for formatting large numbers e.g population)
export const formatNumber = number => {
  const locale = navigator.language;
  const formatNb = new Intl.NumberFormat(locale).format(number);

  return formatNb;
};

//Add '%20' if input contains > 1 word, used as template literal for fetching API
export const addValueBetweenWords = input => {
  const arr = input.toLowerCase().trim().split(' ');
  if (arr.length > 1) {
    return arr.join(' ').replaceAll(' ', '%20');
  } else {
    return arr.join('');
  }
};

//Helper for rendering error in DOM
export const renderError = (el, msg) => {
  if (!el) return;
  el.classList.remove('hide');
  el.textContent = msg;
};

//always clear error labels when new search happens
export const clearErrorLabel = errorLabel => {
  errorLabel.classList.add('hide');
};

//Helpers for getting currency, capital and laguage data.
//*There are countries that don't have some of these properties in API. If there's no such property, it's gonna return a custom string
export const currencyCheck = data => {
  if (data.currencies)
    return Object.values(Object.values(data.currencies)[0]).join(', ');
  if (!data.currencies) return 'No currency';
};

export const capitalCheck = data => {
  if (data.capital) return data.capital[0];
  if (!data.capital) return 'no capital';
};

export const languagesCheck = data => {
  if (data.languages) return Object.values(data.languages).join(', ');

  if (!data.languages) return 'No languages';
};
