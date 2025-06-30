"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
//   console.log('💾 saving to storage:', key, value);
}

function loadFromStorage(key) {
  var obj = localStorage.getItem(key);
//   console.log(obj,key)
//   console.log(JSON.parse(obj))
  return JSON.parse(obj);
}

"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
//   console.log('💾 saving to storage:', key, value);
}

function loadFromStorage(key) {
  var obj = localStorage.getItem(key);
//   console.log(obj,key)
//   console.log(JSON.parse(obj))
  return JSON.parse(obj);
}
