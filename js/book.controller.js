"use strict";
// console.log('hello controller')
var gCurrEditBookId = null;
var gCurrEditRating = 0;
var gEditMode = false;
var gFilterBy = {
  title: "",
  minRating: 0,
};
var gSortBy = {
  field: "",
  dir: 1, // 1 = ascending, -1 = descending
};
const gPage = {
  idx: 0,
  size: 3,
};

function onInit() {
  readQueryParams();
  renderBooks();
}

function renderBooks() {
  const books = getBooks();
  const elTbody = document.querySelector(".book-table-body");
  const elTable = document.querySelector("table");
  const elMsg = document.querySelector(".no-books-msg");

  if (!books.length) {
    elTable.classList.add("hidden");
    elMsg.classList.remove("hidden");
    return;
  }

  elTable.classList.remove("hidden");
  elMsg.classList.add("hidden");

  const strHtmls = books.map((book) => {
    const stars = getRatingStars(book.rating);

    return `
      <tr>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>${stars}</td>
        <td>
          <button class="action-btn details-btn" onclick="onShowDetails('${book.id}')">Details</button>
          <button class="action-btn update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
          <button class="action-btn delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
      </tr>
    `;
  });

  elTbody.innerHTML = strHtmls.join("");
  updateStats();

  document.querySelector(".page-num").innerText = `Page ${gPage.idx + 1}`;

  document.querySelector(".filter-title").value = gFilterBy.title;
  document.querySelector(".filter-rating").value = gFilterBy.minRating;
  document.querySelector(".sort-field").value = gSortBy.field;
  document.querySelector(
    `input[name="sort-dir"][value="${gSortBy.dir}"]`
  ).checked = true;

  setQueryParams();
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  showUserMsg("Book removed!");
  renderBooks();
}

function onUpdateBook(bookId) {
  const book = getBookById(bookId);
  gEditMode = true;
  gCurrEditBookId = bookId;
  gCurrEditRating = book.rating;

  const elModal = document.querySelector(".book-edit-modal");
  elModal.querySelector(".modal-title").innerText = "Edit Book";
  elModal.querySelector('input[name="title"]').value = book.title;
  elModal.querySelector('input[name="price"]').value = book.price;
  elModal.querySelector(".edit-rating-display").innerText = gCurrEditRating;

  elModal.showModal();
  renderBooks();
}

function onShowDetails(bookId) {
  const book = getBookById(bookId);
  const elModal = document.querySelector(".book-details-modal");
  const elDetails = document.querySelector(".book-details");
  elDetails.innerText = `ID: ${book.id}
    Title: ${book.title}
     Price: ${book.price} `;

  elModal.showModal();
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set("bookId", bookId);
  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.pushState({}, "", newUrl);
  //   renderBooks();
}

function onAddBook() {
  gEditMode = false;
  gCurrEditBookId = null;
  gCurrEditRating = 0;

  const elModal = document.querySelector(".book-edit-modal");
  elModal.querySelector(".modal-title").innerText = "Add New Book";
  elModal.querySelector('input[name="title"]').value = "";
  elModal.querySelector('input[name="price"]').value = "";
  elModal.querySelector(".edit-rating-display").innerText = gCurrEditRating;

  elModal.showModal();
  renderBooks();
}

/* Extra fitures */

function onSetFilterBy(filterValue) {
  gFilterBy = filterValue;
  renderBooks();
}

function onClearFilter() {
  gFilterBy = "";
  document.querySelector(".filter-wrapper input").value = "";
  renderBooks();
}

function showUserMsg(msg) {
  const elMsg = document.querySelector(".user-msg");
  elMsg.innerText = msg;
  elMsg.classList.remove("hidden");

  setTimeout(() => {
    elMsg.classList.add("hidden");
  }, 2000);
}

function updateStats() {
  const books = getBooks();
  var cheap = 0;
  var avg = 0;
  var exp = 0;

  books.forEach((book) => {
    if (book.price < 80) cheap++;
    else if (book.price <= 200) avg++;
    else exp++;
  });

  document.querySelector(".cheap-count").innerText = cheap;
  document.querySelector(".avg-count").innerText = avg;
  document.querySelector(".exp-count").innerText = exp;
}
function onOpenEditModal() {
  document.querySelector(".book-edit-modal").showModal();
}
function onCloseEditModal() {
  document.querySelector(".book-edit-modal").close();
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.delete("bookId");
  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.pushState({}, "", newUrl);

  renderBooks();
}

function changeEditRating(diff) {
  gCurrEditRating += diff;
  if (gCurrEditRating < 0) gCurrEditRating = 0;
  if (gCurrEditRating > 5) gCurrEditRating = 5;
  document.querySelector(".edit-rating-display").innerText = gCurrEditRating;
}
function onSubmitBookForm(ev) {
  ev.preventDefault();
  const elModal = document.querySelector(".book-edit-modal");

  const title = elModal.querySelector('input[name="title"]').value.trim();
  const price = +elModal.querySelector('input[name="price"]').value;

  if (!title || isNaN(price) || price <= 0) {
    alert("Invalid input");
    return;
  }

  if (gEditMode) {
    const book = getBookById(gCurrEditBookId);
    book.title = title;
    book.price = price;
    book.rating = gCurrEditRating;
    showUserMsg("Book updated!");
  } else {
    const book = {
      id: makeId(),
      title,
      price,
      rating: gCurrEditRating,
    };
    addBook(book);
    showUserMsg("Book added!");
  }

  saveToStorage(STORAGE_KEY, gBooks);
  elModal.close();
  renderBooks();
}

function onSetFilterBy(title) {
  gFilterBy.title = title;
  renderBooks();
}

function onSetMinRating(minRating) {
  gFilterBy.minRating = +minRating;
  renderBooks();
}
function getRatingStars(rating) {
  const fullStar = "★";
  const emptyStar = "☆";
  return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

function onClearFilter() {
  gFilterBy = { title: "", minRating: 0 };

  document.querySelector(".filter-title").value = "";
  document.querySelector(".filter-rating").value = "0";

  renderBooks();
}

function onSetSortField(field) {
  gSortBy.field = field;
  renderBooks();
}

function onSetSortDir(dir) {
  gSortBy.dir = +dir;
  renderBooks();
}
/*pagination */
function onChangePage(diff) {
  const totalPages = Math.ceil(getBooksCount() / gPage.size);

  gPage.idx += diff;

  if (gPage.idx < 0) gPage.idx = totalPages - 1;
  else if (gPage.idx >= totalPages) gPage.idx = 0;

  renderBooks();
}
/*query params */
function setQueryParams() {
  const queryParams = new URLSearchParams();

  queryParams.set("title", gFilterBy.title);
  queryParams.set("minRating", gFilterBy.minRating);
  queryParams.set("sortField", gSortBy.field);
  queryParams.set("sortDir", gSortBy.dir);
  queryParams.set("pageIdx", gPage.idx);

  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.pushState({}, "", newUrl);
}

function readQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);

  gFilterBy.title = queryParams.get("title") || "";
  gFilterBy.minRating = +queryParams.get("minRating") || 0;
  gSortBy.field = queryParams.get("sortField") || "";
  gSortBy.dir = +queryParams.get("sortDir") || 1;
  gPage.idx = +queryParams.get("pageIdx") || 0;

  const bookId = queryParams.get("bookId");
  if (bookId) onShowDetails(bookId);
}


function onCloseAndEdit() {
  const bookId = new URLSearchParams(window.location.search).get('bookId')
  if (!bookId) return

  document.querySelector('.book-details-modal').close()

  const queryParams = new URLSearchParams(window.location.search)
  queryParams.delete('bookId')
  const newUrl = `${window.location.pathname}?${queryParams.toString()}`
  window.history.pushState({}, '', newUrl)

  onUpdateBook(bookId)
}
