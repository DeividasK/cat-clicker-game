var CATS_DATA = [
  { name: "Roger", img: "img/cat.jpg", clicks: 0 },
  { name: "James", img: "img/cat-2.jpg", clicks: 0 },
  { name: "Bond", img: "img/cat-3.jpg", clicks: 0 },
  { name: "Jimmy", img: "img/cat-4.jpg", clicks: 0 },
  { name: "Tom", img: "img/cat-5.jpg", clicks: 0 }
];

function getCount(element) {
  return parseInt(element.innerHTML);
}

function setCount(element, count) {
  return element.innerHTML = count;
}

function increaseCount(element) {
  return setCount(element, getCount(element) + 1);
}

function increaseCounter() {
  var element = document.getElementById('clicks-counter');
  
  increaseCount(element);
}

function getCatName(name) {
  var elem = document.createElement('h2');
  elem.textContent = name;
  
  return elem;
}

function getCatPicture(catObject) {
  var elem = document.createElement('img');
  
  elem.src = catObject.img;
  elem.className = 'img-response img-thumbnail';
  elem.onclick = function() {
      catObject.clicks += 1;
      increaseCounter();
  }
  
  return elem;
}

function getCounter(clicksCount) {
  var elem = document.createElement('h3');
  
  elem.textContent = 'Counter: ';
  
  var count = document.createElement('span');
  count.id = 'clicks-counter';
  count.textContent = clicksCount;
  
  elem.appendChild(count);
  
  return elem;
}

function displayCat(catObject) {
  var elem = document.getElementById('cat-display');
  elem.innerHTML = '';
  elem.appendChild(getCatName(catObject.name));
  elem.appendChild(getCatPicture(catObject));
  elem.appendChild(getCounter(catObject.clicks))
}

function createCatListItem(catObject) {
  var elem = document.createElement('li');
  
  elem.textContent = catObject.name;
  elem.className = 'list-group-item';
  elem.onclick = function() { return displayCat(catObject); };
  
  return elem;
}

function createCatList(elem, cats) {
  cats.forEach(function(cat){
    elem.appendChild(createCatListItem(cat));
  });
}

var catsList = document.getElementById('cat-list');

createCatList(catsList, CATS_DATA);