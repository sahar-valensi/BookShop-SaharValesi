"use strict";
// console.log('hello controller')

function onInit() {
  rederBooks();
}

function rederBooks() {
  const books = getBooks();
  const elTbody = document.querySelector(".book-table-body");
  var strHtmls = books.map(
    (book) =>
      `<tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="action-btn">Details</button>
                <button class="action-btn">Update</button>
                <button class="action-btn">Delete</button>
            </td>
        </tr>
    `
  );
  elTbody.innerHTML = strHtmls.join('')
}
