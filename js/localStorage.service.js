<<<<<<< HEAD
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
=======
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
>>>>>>> 9e08b9e3a6fa6d1d16a4052c4802182ae15e254f
