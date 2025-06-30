"use strict";
// console.log('hello service')
const STORAGE_KEY = "bookDB";
var gFilterBy = '';
var gBooks = _createBooks();

function getBooks() {
  if (!gFilterBy) return gBooks;

  const filteredBooks = gBooks.filter(book =>
    book.title.toLowerCase().includes(gFilterBy.toLowerCase())
  );
  
  return filteredBooks;
}
function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId);
  gBooks.splice(idx, 1);
  saveToStorage(STORAGE_KEY, gBooks);
}

function updateBookPrice(bookId, newPrice) {
  const book = getBookById(bookId);
  book.price = newPrice;
  saveToStorage(STORAGE_KEY, gBooks);
}
function getBookById(bookId) {
  return gBooks.find((book) => book.id === bookId);
}
function addBook(book) {
  gBooks.unshift(book);
  saveToStorage(STORAGE_KEY, gBooks);
}
function _createBooks() {
  // console.log('books:',gBooks)
  var books = loadFromStorage(STORAGE_KEY);
  console.log("books:", books);
  if (books && books.length > 0) return books;

  var demoBooks = [
    { id: "b101", title: "The Hobbit", price: 90 },
    { id: "b102", title: "Harry Potter", price: 120 },
    { id: "b103", title: "The Alchemist", price: 75 },
  ];
  saveToStorage(STORAGE_KEY, demoBooks);
  return demoBooks;
}
