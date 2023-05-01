import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

//Global query selectors
const list = document.querySelector("[data-list-items]");
const loadMore = document.querySelector("[data-list-button]");
const previewOverlay = document.querySelector("[data-list-active]");
const closeBtn = document.querySelector("[data-list-close]")
const overlayBtn = previewOverlay.querySelector('.overlay__button')
overlayBtn.style.outline = 0; // Fixing the outline bug 
const overlayBlur = previewOverlay.querySelector(".overlay__blur");
const overlayImage = previewOverlay.querySelector(".overlay__image");
const titleOverlay = previewOverlay.querySelector(".overlay__title");
const dataOverlay = previewOverlay.querySelector(".overlay__data");
const infoOverlay = previewOverlay.querySelector("[data-list-description]");

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
  list.appendChild(innerHTML(books[i], i));
}

let loaded = 0;

loadMore.innerHTML = `<span>Show more</span>
<span class = "list__remaining">(${
  books.length - BOOKS_PER_PAGE - loaded
})</span>`;

const moreBooks = (e) => {
  loaded += BOOKS_PER_PAGE;
  let booksLeft = books.length - BOOKS_PER_PAGE - loaded;
  let btnText = booksLeft > 0 ? booksLeft : 0;
  loadMore.innerHTML = `<span>Show more</span>
  <span class = "list__remaining">(${btnText})</span>`;
  let booksLoaded = BOOKS_PER_PAGE + loaded;
  for (let i = loaded; i < booksLoaded; i++) {
    list.appendChild(innerHTML(books[i], i));
    if (i === books.length - 1) {
      loadMore.disabled = true;
    }
  }
};

const openOverlay = (e) => {
  const bookPreview = e.target.closest(".preview");
  const index = bookPreview.dataset.index;

  overlayBlur.src = books[index].image;
  overlayImage.src = books[index].image;
  titleOverlay.textContent = books[index].title;
  let dateOverlay = new Date(books[index].published).getFullYear();
  dataOverlay.textContent = `${authors[books[index].author]} (${dateOverlay})`;
  infoOverlay.textContent = books[index].description;

  previewOverlay.show();
};

loadMore.addEventListener("click", moreBooks);
list.addEventListener("click", openOverlay);
closeBtn.addEventListener("click", () => {
  previewOverlay.close();
});

// if (!books && !Array.isArray(books)) throw new Error('Source required')
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

// fragment = document.createDocumentFragment()
// const extracted = books.slice(0, 36)

// for ({ author, image, title, id }; extracted; i++) {
//     const preview = createPreview({
//         author,
//         id,
//         image,
//         title
//     })

//     fragment.appendChild(preview)
// }

// data-list-items.appendChild(fragment)

// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data-search-genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

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

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />

//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

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
