// Budget Controller
var budgetController = (function() {})();

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
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
