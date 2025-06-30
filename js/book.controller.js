"use strict";
// console.log('hello controller')

function onInit() {
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

  const strHtmls = books.map(
    (book) =>
      `<tr>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>
          <button class="action-btn details-btn" onclick="onShowDetails('${book.id}')">Details</button>
          <button class="action-btn update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
          <button class="action-btn delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
      </tr>`
  );

  elTbody.innerHTML = strHtmls.join("");
  updateStats();
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  showUserMsg("Book removed!");
  renderBooks();
}

function onUpdateBook(bookId) {
  const newPrice = +prompt("Enter a new price:");
  if (!newPrice || newPrice <= 0) return alert("Invalid Price");
  updateBookPrice(bookId, newPrice);
  showUserMsg("Book price updated!");
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
  //   renderBooks();
}

function onAddBook() {
  const title = prompt("Give me the name of the book:");
  const priceStr = prompt("Give me the price of the book:");

  if (!title || !title.trim()) {
    alert("Book title cannot be empty.");
    return;
  }

  const price = +priceStr;
  if (!priceStr || isNaN(price) || price <= 0) {
    alert("Invalid price.");
    return;
  }

  const book = {
    id: makeId(),
    title: title.trim(),
    price,
  };

  addBook(book);
  showUserMsg("Book added!");
  renderBooks();
}

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
function onOpenAddModal() {
  document.querySelector(".add-book-modal").showModal();
}
function onCloseAddModal() {
  document.querySelector('.add-book-modal').close();
}

function onSubmitAddBook(ev) {
  ev.preventDefault();

  const elModal = document.querySelector(".add-book-modal");
  const title = elModal.querySelector('input[name="title"]').value.trim();
  const priceStr = elModal.querySelector('input[name="price"]').value;
  const price = +priceStr;

  if (!title || !priceStr || isNaN(price) || price <= 0) {
    alert("Please enter a valid title and price.");
    return;
  }

  const book = {
    id: makeId(),
    title,
    price,
  };

  addBook(book);
  showUserMsg("Book added!");
  renderBooks();
  elModal.close();
}
