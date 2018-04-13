// Budget Controller
var budgetController = (function() {
  // Contructor for expenses
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Contructor for incomes
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
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
    },
    budget: 0,
    percentage: -1 // -1 non exitent
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      //Create new id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

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
    },

    calculatBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate th percentage of income that we spent
      data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list'
  };

  return {
    // get value from select inputs
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addNewItem: function(obj, type) {
      var html, newHtml, element;

      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      console.log(obj.description);

      // Insert HTML to the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    // Clear the fields after procces them
    clearFields: function() {
      var fields;

      //Select all inputs
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = '';
      });

      fieldsArr[0].focus();
    },

    // Make Object UI elements public
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// Controller
var controller = (function(budgetCtrl, UIctrl) {
  // Setup event Listeners
  var setupEventListeners = function() {
    var DOM = UIctrl.getDOMstrings();

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

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculatBudget();

    // 2. return the budget
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget
  };

  // function when input button is clicked
  var ctrlAddItem = function() {
    var input, newItem;

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 1. Get the filed input data
      input = UIctrl.getinput();

      // 2. Add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UIctrl.addNewItem(newItem, input.type);

      // 4. Clear the fields
      UIctrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();
    }
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
