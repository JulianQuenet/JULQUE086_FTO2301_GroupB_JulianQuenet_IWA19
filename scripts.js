
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};
const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

const list = document.querySelector("[data-list-items]");

const innerHTML = (x, y) => {
  const booksElement = document.createElement("div");
  booksElement.dataset.index = `${y}`;
  booksElement.className = "preview";
  booksElement.id = x.id;
  booksElement.innerHTML = ` <img src = ${
    x.image
  } class = 'preview__image'  alt="${x.title} book image"></img>
  <div class="preview__info">
    <h3 class="preview__title">${x.title}</h3>
    <div class="preview__author">${authors[x.author]}</div>
    </div>`;
  return booksElement;
};

books.forEach((book, index) => {
  const bookElement = innerHTML(book, index);
  list.appendChild(bookElement);
});

const previews = list.querySelectorAll(".preview"); // Getting all the books added to the DOM

for (let i = 0; i < previews.length; i++) {
  if (i > BOOKS_PER_PAGE-1) {
    document
      .getElementById(`${previews[i].id}`)
      .classList.add("preview_hidden");
  }
}

const loadMore = document.querySelector(".list__button");
loadMore.textContent = "Load more";
let loaded = 0;


const onClick = (e) => {
  loaded += BOOKS_PER_PAGE;
  let booksLoaded = BOOKS_PER_PAGE + loaded;
  for (let i = 0; i < previews.length - (previews.length - booksLoaded); i++) {
    if (i < booksLoaded) {
      document
        .getElementById(`${previews[i].id}`)
        .classList.remove("preview_hidden");
    }
  }
};

loadMore.addEventListener("click", onClick);

const previewOverlay = document.querySelector("[data-list-active]");
const closeBtn = document.querySelector(".overlay__button");

const openOverlay = (e) => {
  const bookPreview = e.target.closest('.preview')
  const index = bookPreview.dataset.index;
  //Image blur for the overlay
  const overlayBlur = previewOverlay.querySelector(".overlay__blur");
  overlayBlur.src = books[index].image;
  //Image for the overlay
  const overlayImage = previewOverlay.querySelector(".overlay__image");
  overlayImage.src = books[index].image;
  //Title for the overlay
  const titleOverlay = previewOverlay.querySelector(".overlay__title");
  titleOverlay.textContent = books[index].title;
  //The author and date for the overlay
  const dataOverlay = previewOverlay.querySelector(".overlay__data");
  let dateOverlay = new Date(books[index].published).getFullYear();
  dataOverlay.textContent = `${authors[books[index].author]} (${dateOverlay})`;
  //The description of book for the overlay
  const infoOverlay = previewOverlay.querySelector("[data-list-description]");
  infoOverlay.textContent = books[index].description;

  previewOverlay.show();
};

previews.forEach((preview) => {
  preview.addEventListener("click", openOverlay);
  closeBtn.addEventListener("click", () =>{
    previewOverlay.close();
  });
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
