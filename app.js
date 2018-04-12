// Budget Controller
var budgetController = (function() {})();

// UI Controller
var UIController = (function() {
  //Object to control UI elements
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value'
  };

  return {
    getinput: function() {
      return {
        // get value from select (income or expense);
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    }
  };
})();

// Controller
var controller = (function(budgetCtrl, UIctrl) {
  var ctrlAddItem = function() {
    // 1. Get the filed input data
    var input = UIctrl.getinput();

    // 2. Add item to budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget
  };

  //click event
  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  //key press event
  document.addEventListener('keypress', function(event) {
    // check if ENTER key is pressed
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
