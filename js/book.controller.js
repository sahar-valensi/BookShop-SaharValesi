"use strict";
// console.log('hello controller')

function onInit() {
  renderBooks();
}

function renderBooks() {
  const books = getBooks();
  const elTbody = document.querySelector(".book-table-body");
  var strHtmls = books.map(
    (book) =>
      `<tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="action-btn details-btn" onclick="onShowDetails('${book.id}')">Details</button>
                <button class="action-btn update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
                <button class="action-btn delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
    `
  );
  elTbody.innerHTML = strHtmls.join("");
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
}
function onUpdateBook(bookId) {
  const newPrice = +prompt("Enter a new price:");
  if (!newPrice || newPrice <= 0) return alert("Invalid Price");
  updateBookPrice(bookId, newPrice);
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
  const price = +prompt("Give me the price of the book:");
  const book = {
    id: makeId(),
    title,
    price,
  };
  addBook(book);
//   console.log(gBooks)
 renderBooks()
}
