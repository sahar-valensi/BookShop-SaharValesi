"use strict";
// console.log('hello service')
var gBooks = [
  { id: "b101", title: "The Hobbit", price: 90 },
  { id: "b102", title: "Harry Potter", price: 120 },
  { id: "b103", title: "The Alchemist", price: 75 },
];

function getBooks() {
  return gBooks;
}
function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId);
  gBooks.splice(idx, 1);
}

function updateBookPrice(bookId, newPrice) {
  const book = getBookById(bookId)
  book.price = newPrice;
}
function getBookById(bookId) {
  return gBooks.find((book) => book.id === bookId);
}
function addBook(book){
    gBooks.unshift(book)
}

