import { genresObj, authors} from "./data.js";

/** 
 * Object containing all query selectors
 */
export const selectors = {
  list: document.querySelector("[data-list-items]"),
  message: document.querySelector("[data-list-message]"),
  loadMore: document.querySelector("[data-list-button]"),
  previewOverlay: {
    overlay: document.querySelector("[data-list-active]"),
    overlayBtn: document.querySelector("[data-list-close]"),
    overlayBlur: document.querySelector("[data-list-blur]"),
    overlayImage: document.querySelector("[data-list-image]"),
    titleOverlay: document.querySelector("[data-list-title]"),
    dataOverlay: document.querySelector("[data-list-subtitle]"),
    infoOverlay: document.querySelector("[data-list-description]"),
  },
  theme: {
    themeBtn: document.querySelector("[data-header-settings]"),
    themeOverlay: document.querySelector("[data-settings-overlay]"),
    themeCancelBtn: document.querySelector("[data-settings-cancel]"),
    themeForm: document.querySelector("[data-settings-form]"),
    themeSelect: document.querySelector("[data-settings-theme]"),
  },
  search: {
    searchBtn: document.querySelector("[data-header-search]"),
    searchOverlay: document.querySelector("[data-search-overlay]"),
    searchCancelBtn: document.querySelector("[data-search-cancel]"),
    searchForm: document.querySelector("[data-search-form]"),
  },
  genresSelect: document.querySelector("[data-search-genres]"),
  authorSelect: document.querySelector("[data-search-authors]"),
  title: document.querySelector("[data-search-title]"),
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

document.querySelector(".overlay__button").style.outline = 0; // Fixing the outline bug with the overlay close button



/**
 * Function made to insert values from the inputted objects to the newly created 'option' element, a fragment is created
 * as well and the new options elements with their values are appended to the fragment, the function then returns the 
 * fragment which can then be appended to the required parent element, the function also takes in a string argument
 * which is primarily used to create a default option value i.e "All". To get the the values from the objects the function 
 * runs a loop through the object getting both the key values and the properties of those key values.
 * @param {string} text 
 * @param {object} object 
 * @returns appended element
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
selectors.previewOverlay.titleOverlay.style.color = `rgba(var(--color-dark))`
selectors.previewOverlay.dataOverlay.style.color =  `rgba(var(--color-dark))`
selectors.previewOverlay.infoOverlay.style.color =  `rgba(var(--color-dark))`