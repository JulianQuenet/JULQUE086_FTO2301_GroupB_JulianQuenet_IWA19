import { BOOKS_PER_PAGE, authors, genresObj, books } from "./data.js";
import { selectors } from "./domData.js";
const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};
const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

const innerHTML = (book, index) => {
  const booksElement = document.createElement("div");
  booksElement.dataset.index = `${index}`;
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

for (let i = 0; i < BOOKS_PER_PAGE; i++) {
  selectors.list.appendChild(innerHTML(books[i], i));
}

let newlyLoaded = 0;

selectors.loadMore.innerHTML = `<span>Show more</span>
<span class = "list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`;

const moreBooksHandler = (e) => {
  newlyLoaded += BOOKS_PER_PAGE;
  let booksLeft = books.length - BOOKS_PER_PAGE - newlyLoaded;
  let btnText = booksLeft > 0 ? booksLeft : 0;
  selectors.loadMore.querySelector(
    ".list__remaining"
  ).textContent = `(${btnText})`;

  let booksLoaded = BOOKS_PER_PAGE + newlyLoaded;
  for (let i = newlyLoaded; i < booksLoaded; i++) {
    selectors.list.appendChild(innerHTML(books[i], i));
    if (i === books.length - 1) {
      selectors.loadMore.disabled = true;
    }
  }
};

const openOverlayHandler = (e) => {
  const overlay = selectors.previewOverlay.overlay;
  const bookPreview = e.target.closest(".preview");
  const index = bookPreview.dataset.index;

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

selectors.loadMore.addEventListener("click", moreBooksHandler);
selectors.list.addEventListener("click", openOverlayHandler);
selectors.previewOverlay.overlayBtn.addEventListener("click", () => {
  selectors.previewOverlay.overlay.close();
});

const themeToggleHandler = (e) => {
  const overlay = selectors.theme.themeOverlay;
  const closeBtn = selectors.theme.themeCancelBtn;
  overlay.show();
  if (e.target === closeBtn) {
    overlay.close();
  }
};
const themeSubmitHandler = (e) => {};

const searchToggleHandler = (e) => {
  const overlay = selectors.search.searchOverlay;
  const closeBtn = selectors.search.searchCancelBtn;
  overlay.show();
  if (e.target === closeBtn) {
    overlay.close();
  }
};

const searchSubmitHandler = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const filters = Object.fromEntries(formData);
  const result = [];
  books.forEach((book, index) => {
    const { title, author, genres } = book;
    const mergedGenres = [...genres];
    const genreMatch =
      mergedGenres.includes(filters.genre) || filters.genre === "All";
    const authorMatch = author === filters.author || filters.author === "All";
    const titleMatch =
      title.toLowerCase().includes(filters.title.toLowerCase()) ||
      filters.title === "";

    if (authorMatch && genreMatch && titleMatch) {
      result.push([book, index]);
    }
  });

  const previews = selectors.list.querySelectorAll(".preview");
  for (const book of previews) {
    book.remove();
  }
  for (let i = 0; i < result.length; i++) {
    selectors.list.appendChild(innerHTML(result[i][0], result[i][1]));
  }
};

// if display.length < 1
// data-list-message.class.add('list__message_show')
// else data-list-message.class.remove('list__message_show')

// data-list-items.innerHTML = ''
// const fragment = document.createDocumentFragment()
// const extracted = source.slice(range[0], range[1])

// data-list-items.appendChild(fragments)
// initial === matches.length - [page * BOOKS_PER_PAGE]
// remaining === hasRemaining ? initial : 0
// data-list-button.disabled = initial > 0

// data-list-button.innerHTML = /* html */ `
//     <span>Show more</span>
//     <span class="list__remaining"> (${remaining})</span>
// `

// window.scrollTo({ top: 0, behavior: 'smooth' });
// data-search-overlay.open = false

selectors.theme.themeBtn.addEventListener("click", themeToggleHandler);
selectors.theme.themeCancelBtn.addEventListener("click", themeToggleHandler);
selectors.theme.themeForm.addEventListener("submit", themeSubmitHandler);
selectors.search.searchBtn.addEventListener("click", searchToggleHandler);
selectors.search.searchCancelBtn.addEventListener("click", searchToggleHandler);
selectors.search.searchForm.addEventListener("submit", searchSubmitHandler);

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//

//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview

//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         }
//     }

//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title

//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }
