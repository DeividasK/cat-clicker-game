/* MODEL */
var model = {
  currentCat: null,
  changedCat: {},
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
    this.setCurrentCat(model.cats[0]);

    // tell our views to initialize
    catListView.init();
    catView.init();
    adminView.init();
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
  
  saveCatChanges: function(name, img, clickCount) {
    model.currentCat.name = name;
    model.currentCat.src = img;
    model.currentCat.clickCount = clickCount;
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
          adminView.render();
      };

      // Add the element to the list
      this.catListElem.appendChild(elem);
    }, this);
  }
};

var adminView = {
  init: function() {
    this.adminButton = document.getElementById('admin-button');
    
    this.adminButton.onclick = function() {
      adminView.toogle();
    };
    
    // admin panel
    this.adminDisplay = document.getElementById('admin-display');
    
    // form items
    this.catNameElem = document.getElementById('cat-name-edit');
    this.catImageElem = document.getElementById('cat-img-edit');
    this.catClicksElem = document.getElementById('cat-clicks-edit');
    this.editSave = this.adminDisplay.getElementsByTagName('button')[0];
    this.editCancel = this.adminDisplay.getElementsByTagName('button')[1];
    
    this.editSave.onclick = function() {
      adminView.save();
    };
    
    this.editCancel.onclick = function() {
      adminView.cancel();
    };
    
    this.render();
  },
  
  render: function() {
    var cat = octopus.getCurrentCat();
    
    this.catNameElem.value = cat.name;
    this.catImageElem.value = cat.src;
    this.catClicksElem.value = cat.clickCount;
  },
  
  toogle: function() {
    if (adminView.adminDisplay.className.includes('hidden')) {
      this.show();
    } else {
      this.cancel();
    }
  },
  
  show: function() {
    this.adminDisplay.className = this.adminDisplay.className.replace('hidden', '').trim();
    this.render();
  },
  
  save: function() {
    octopus.saveCatChanges(this.catNameElem.value, this.catImageElem.value, this.catClicksElem.value);
    catView.render();
  },
  
  cancel: function() {
    this.adminDisplay.className += ' hidden';
  }
};

// make it go!
octopus.init();