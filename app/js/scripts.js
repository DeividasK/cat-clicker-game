/* MODEL */
var model = {
  currentCat: null,
  cats: [
    { name: "Roger", src: "img/cat.jpg", clickCount: 0 },
    { name: "James", src: "img/cat-2.jpg", clickCount: 0 },
    { name: "Bond", src: "img/cat-3.jpg", clickCount: 0 },
    { name: "Jimmy", src: "img/cat-4.jpg", clickCount: 0 },
    { name: "Tom", src: "img/cat-5.jpg", clickCount: 0 }
  ]
};

/* OCTOPUS */
var octopus = {
  init: function() {
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    // tell our views to initialize
    catListView.init();
    catView.init();
  },
  
  getCurrentCat: function() {
    return model.currentCat;
  },
  
  getCats: function() {
    return model.cats;
  },
  
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  
  incrementCounter: function() {
    model.currentCat.clickCount += 1;
    catView.render();
  }
};

/* VIEWS */

var catView = {
  
  init: function() {
    // store pointers to our DOM elements for easy access later
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('clicks-counter');
    
    // on click, increment the current cat's counter
    this.catImageElem.onclick = function() {
      octopus.incrementCounter();
    };
    
    // render this view (update the DOM elements with the right values)
    this.render();
  },
  
  render: function() {
    // update the DOM elements with values from the current cat
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.src;
  }
}

var catListView = {

  init: function() {
    // store the DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    var elem;

    // empty the cat list
    this.catListElem.innerHTML = '';

    octopus.getCats().forEach(function(cat) {
      // make a new cat list item and set its text
      elem = document.createElement('li');
      elem.textContent = cat.name;
      elem.className = 'list-group-item'
      
      elem.onclick = function() {
          octopus.setCurrentCat(cat);
          catView.render();
      };

      // Add the element to the list
      this.catListElem.appendChild(elem);
    }, this);
  }
};

// make it go!
octopus.init();