import { BOOKS_PER_PAGE, authors, genresObj, books } from "./data.js";
import { selectors, css } from "./domData.js";



/** Function made to create the innerHtml for the created element(booksElement) in the function and insert the values inputted
 * to the areas required in order to display correctly in the html/DOM, this function will also take
 * in the inputted values to add unique attributes to the created element i.e. class name and or 
 * dataset. The function returns the booksElement which can be later appended to the chosen parent element.
 * 
 * @param {object} book 
 * @param {number} index 
 * @returns newly created element
 */
const innerHTML = (book, index) => {
  const booksElement = document.createElement("div");
  booksElement.dataset.index = `${index}`; // Retrieving the index to make it easier to fetch data for future use 
  booksElement.className = "preview";
  booksElement.id = book.id;
  booksElement.innerHTML = ` <img src = ${
    book.image
  } class = 'preview__image'  alt="${book.title} book image"></img>
  <div class="preview__info">
    <h3 class="preview__title">${book.title}</h3>
    <div class="preview__author">${authors[book.author]}</div>
    </div>`;
  return booksElement;
};

// Initial loading of the first 36 books 
for (let i = 0; i < BOOKS_PER_PAGE; i++) {
  selectors.list.appendChild(innerHTML(books[i], i)); 
}

// Changing the text content of the "Show more" button
selectors.loadMore.innerHTML = `<span>Show more</span>
<span class = "list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`;


let newlyLoaded = 0;
//------------------------------------------------All eventHandlers below-------------------------------------------------------

// loads more books when the loadMore button is clicked
const moreBooksHandler = (e) => {
  e.stopPropagation();
  newlyLoaded += BOOKS_PER_PAGE; // Once clicked the newlyLoaded is incremented by BOOKS_PER_PAGE to keep track of books added
  let booksLeft = books.length - BOOKS_PER_PAGE - newlyLoaded; 
  let btnText = booksLeft > 0 ? booksLeft : 0;
  selectors.loadMore.querySelector(".list__remaining").textContent = `(${btnText})`;
  
  let booksLoaded = BOOKS_PER_PAGE + newlyLoaded;
  //With concern to time complexity this event handler will only ever loop through and append a max of 36 items
  for (let i = newlyLoaded; i < booksLoaded; i++) {
    if (i === books.length - 1) {
      selectors.loadMore.disabled = true;
      break;
    } else {
      selectors.list.appendChild(innerHTML(books[i], i));
    }
  }
};

// Opens the preview overlay when a preview is clicked and display all the same information as the preview and more
const openOverlayHandler = (e) => {
  const overlay = selectors.previewOverlay.overlay;
  const bookPreview = e.target.closest(".preview");
  const index = bookPreview.dataset.index; // The index is used to retrieve the corresponding data

  selectors.previewOverlay.overlayBlur.src = books[index].image;
  selectors.previewOverlay.overlayImage.src = books[index].image;
  selectors.previewOverlay.titleOverlay.textContent = books[index].title;
  let dateOverlay = new Date(books[index].published).getFullYear();
  selectors.previewOverlay.dataOverlay.textContent = `${
    authors[books[index].author]
  } (${dateOverlay})`;
  selectors.previewOverlay.infoOverlay.textContent = books[index].description;

  overlay.show();
};

// Opens the theme settings and sets it's values
const themeToggleHandler = (e) => {
  // Checks to see if backgroundColor matches that of the set 'night' color scheme
  const darkMode =getComputedStyle(document.body).backgroundColor ===`rgb(${css.night.light})`;
  selectors.theme.themeSelect.value = darkMode ? "night" : "day";

  const overlay = selectors.theme.themeOverlay;
  const closeBtn = selectors.theme.themeCancelBtn;
  overlay.show();
  if (e.target === closeBtn) {
    overlay.close();
  }
};

// Changes the color scheme when the form values have been saved/submitted
const themeSubmitHandler = (e) => {
  e.preventDefault();

  const overlay = selectors.theme.themeOverlay;
  const formData = new FormData(e.target);
  const themeChoice = Object.fromEntries(formData);
  const theme = themeChoice.theme;
  document.documentElement.style.setProperty("--color-dark", css[theme].dark);
  document.documentElement.style.setProperty("--color-light", css[theme].light);
  overlay.close();
};

let formValues;//Will only be truthy when the searchFrom is submitted

//Opens/closes the filter form 
const searchToggleHandler = (e) => {
  const overlay = selectors.search.searchOverlay;
  const closeBtn = selectors.search.searchCancelBtn;
  overlay.show();
  if (formValues) { // The values are based on what was entered into the form
    selectors.genresSelect.value = formValues.genre;
    selectors.authorSelect.value = formValues.author;
    selectors.title.value = formValues.title;
  }
  if (e.target === closeBtn) {
    overlay.close();
    selectors.search.searchForm.reset()
  }
};

let filteredBooks; // Will only be truthy when searchForm is submitted
let filteredLoad; // Will only receive a value when the searchForm is submitted

const searchSubmitHandler = (e) => {
  e.preventDefault();
  const overlay = selectors.search.searchOverlay;
  const formData = new FormData(e.target);
  const filters = Object.fromEntries(formData);
  const result = [];
  books.forEach((book, index) => {
    const { title, author, genres } = book;
    const categories = [...genres];//Spread operator to make sifting through the data easier instead of using a for of loop

    const genreMatch =categories.includes(filters.genre) || filters.genre === "All";
    const authorMatch = author === filters.author || filters.author === "All";
    const titleMatch =title.toLowerCase().includes(filters.title.toLowerCase()) || filters.title === "";
  //Only if all three are true will the data get pushed to the array
    if (authorMatch && genreMatch && titleMatch) {
      result.push([book, index]);
    }
  });
//---------------------------------------------Retrieving and manipulating data above this line-----------------------------------------
//-----------------------------------------------Below this line: Conditionals and actions----------------------------------------------
  const previews = selectors.list.querySelectorAll(".preview");
  for (const book of previews) {
    book.remove();//Upon submission all previous books are removed 
  }

  if (result.length === 0) { // If no matches are found the needed message pops up and loadMore button is disabled
    selectors.message.classList.add("list__message_show");
    selectors.loadMore.disabled = true;
    selectors.loadMore.querySelector(".list__remaining").textContent = `(0)`;
  } else {
    selectors.message.classList.remove("list__message_show");
    selectors.loadMore.disabled = false;
  }

  if (result.length < BOOKS_PER_PAGE) { // Loads and appends books and disables the button
    for (let i = 0; i < result.length; i++) {
      let book = result[i][0];
      let index = result[i][1];
      selectors.list.appendChild(innerHTML(book, index));
      selectors.loadMore.disabled = true;
      selectors.loadMore.querySelector(".list__remaining").textContent = `(0)`;
    }
  } else {
    //If there are more books than 36, then 36 are loaded, the rest are loaded with a "new" eventListener
    for (let i = 0; i < BOOKS_PER_PAGE; i++) { 
      let book = result[i][0];
      let index = result[i][1];
      selectors.list.appendChild(innerHTML(book, index));
      selectors.loadMore.querySelector(".list__remaining").textContent = `(${result.length - BOOKS_PER_PAGE})`;
      selectors.loadMore.removeEventListener("click", moreBooksHandler);//Old eventListener is removed
      filteredBooks = result;
    }
  }

  overlay.close();
  filteredLoad = 0; // Is given a value of zero each time it's loaded 
  formValues = filters; // formValues receives the same data as the filters variable i.e gets used in the searchToggleHandler
};


//Same concept as the moreBooksHandler but only runs if filteredBooks is truthy
const filterMoreHandler = (e) => {
  if (!filteredBooks) {
    return;
  }
  filteredLoad += BOOKS_PER_PAGE;
  let booksLeft = filteredBooks.length - BOOKS_PER_PAGE - filteredLoad;
  let btnText = booksLeft > 0 ? booksLeft : 0;
  selectors.loadMore.querySelector(
    ".list__remaining"
  ).textContent = `(${btnText})`;

  let booksLoaded = BOOKS_PER_PAGE + filteredLoad;
  for (let i = filteredLoad; i < booksLoaded; i++) {
    if (i === filteredBooks.length - 1) {
      selectors.loadMore.disabled = true;
      break;
    } else {
      let book = filteredBooks[i][0];
      let index = filteredBooks[i][1];
      selectors.list.appendChild(innerHTML(book, index));
    }
  }
};



//------------------------------------------------All eventListeners fall below----------------------------------------------------

selectors.loadMore.addEventListener("click", moreBooksHandler);
selectors.loadMore.addEventListener("click", filterMoreHandler);
selectors.list.addEventListener("click", openOverlayHandler);
selectors.previewOverlay.overlayBtn.addEventListener("click", () => {
  selectors.previewOverlay.overlay.close();
});

selectors.theme.themeBtn.addEventListener("click", themeToggleHandler);
selectors.theme.themeCancelBtn.addEventListener("click", themeToggleHandler);
selectors.theme.themeForm.addEventListener("submit", themeSubmitHandler);
selectors.search.searchBtn.addEventListener("click", searchToggleHandler);
selectors.search.searchCancelBtn.addEventListener("click", searchToggleHandler);
selectors.search.searchForm.addEventListener("submit", searchSubmitHandler);
