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
                <button class="action-btn" onclick="onShowDetails('${book.id}')">Details</button>
                <button class="action-btn" onclick="onUpdateBook('${book.id}')">Update</button>
                <button class="action-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
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

