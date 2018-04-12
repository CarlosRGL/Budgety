// Budget Controller
var budgetController = (function() {
  // Contructor for expenses
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description - description;
    this.value = value;
  };

  // Contructor for incomes
  var Income = function(id, description, value) {
    this.id = id;
    this.description - description;
    this.value = value;
  };

  // Store the data from Constructors
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      //Create new id
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

      // Create new item based on 'inc' or 'exp'
      if (type === 'exp') {
        newItem = new Expenses(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push it into data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    }
  };
})();

// UI Controller
var UIController = (function() {
  //Object to control UI elements
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    // get value from select inputs
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    //Make Object UI elements public
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// Controller
var controller = (function(budgetCtrl, UIctrl) {
  // Setup event Listeners
  var setupEventListeners = function() {
    var DOM = UIctrl.getDOMstrings;
    //click event
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    //key press event
    document.addEventListener('keypress', function(event) {
      // check if ENTER key is pressed
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  // function when input button is clicked
  var ctrlAddItem = function() {
    // 1. Get the filed input data
    var input = UIctrl.getinput();
    // 2. Add item to budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget
  };

  //init
  return {
    init: function() {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
