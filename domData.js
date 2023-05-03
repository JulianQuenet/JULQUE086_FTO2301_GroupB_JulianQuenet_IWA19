import { genresObj, authors, books } from "./data.js";

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


