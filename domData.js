//@ts-check

import { genresObj, authors } from "./data.js";

/**
 * Function that gets the needed element from the DOM
 *
 * @param {string} label -Represent the identifying element from the DOM
 * @returns {HTMLElement}
 */
const getHtmlElement = (label) => {
  const node = document.querySelector(`${label}`);
  if (!(node instanceof HTMLElement)){
    throw new Error(`${label} element not found in HTML`);
  }
  return node;
};

/**
 * Object containing all query selectors
 */
export const selectors = {
  list: getHtmlElement("[data-list-items]"),
  message: getHtmlElement("[data-list-message]"),
  loadMore: getHtmlElement("[data-list-button]"),
  previewOverlay: {
    overlay: getHtmlElement("[data-list-active]"),
    overlayBtn: getHtmlElement("[data-list-close]"),
    overlayBlur: getHtmlElement("[data-list-blur]"),
    overlayImage: getHtmlElement("[data-list-image]"),
    titleOverlay: getHtmlElement("[data-list-title]"),
    dataOverlay: getHtmlElement("[data-list-subtitle]"),
    infoOverlay: getHtmlElement("[data-list-description]"),
  },
  theme: {
    themeBtn: getHtmlElement("[data-header-settings]"),
    themeOverlay: getHtmlElement("[data-settings-overlay]"),
    themeCancelBtn: getHtmlElement("[data-settings-cancel]"),
    themeForm: getHtmlElement("[data-settings-form]"),
    themeSelect: getHtmlElement("[data-settings-theme]"),
  },
  search: {
    searchBtn: getHtmlElement("[data-header-search]"),
    searchOverlay: getHtmlElement("[data-search-overlay]"),
    searchCancelBtn: getHtmlElement("[data-search-cancel]"),
    searchForm: getHtmlElement("[data-search-form]"),
  },
  genresSelect: getHtmlElement("[data-search-genres]"),
  authorSelect: getHtmlElement("[data-search-authors]"),
  title: getHtmlElement("[data-search-title]"),
  outline: getHtmlElement(".overlay__button")
};

export const css = {
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },
  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
};

// @ts-ignore
document.querySelector(".overlay__button").style.outline = 0; // Fixing the outline bug with the overlay close button

/**
 * Function made to insert values from the inputted objects to the newly created 'option' element, a fragment is created
 * as well and the new options elements with their values are appended to the fragment, the function then returns the
 * fragment which can then be appended to the required parent element, the function also takes in a string argument
 * which is primarily used to create a default option value i.e "All". To get the the values from the objects the function
 * runs a loop through the object getting both the key values and the properties of those key values.
 * @param {string} text
 * @param {object} object
 * @returns {DocumentFragment}
 */
const optionsCreate = (text, object) => {
  const fragment = document.createDocumentFragment();
  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.innerText = text;
  fragment.appendChild(allOption);

  for (const [keyValue, property] of Object.entries(object)) {
    const option = document.createElement("option");
    option.value = keyValue;
    option.innerText = property;
    fragment.appendChild(option);
  }

  return fragment;
};

selectors.genresSelect.appendChild(optionsCreate("All genres", genresObj));
selectors.authorSelect.appendChild(optionsCreate("All authors", authors));

//Set the colors of the preview overlay text to correspond with the theme change
selectors.previewOverlay.titleOverlay.style.color = `rgba(var(--color-dark))`;
selectors.previewOverlay.dataOverlay.style.color = `rgba(var(--color-dark))`;
selectors.previewOverlay.infoOverlay.style.color = `rgba(var(--color-dark))`;
