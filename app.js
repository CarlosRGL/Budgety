// Budget Controller
var budgetController = (function() {
  // Contructor for expenses
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expenses.prototype.calcPercentages = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round(this.value / totalIncome * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expenses.prototype.getPercentage = function() {
    return this.percentage;
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

    deleteItem: function(type, id) {
      var ids, index;
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
      } else {
        data.percentage = -1;
      }
    },

    // calculate percentages
    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentages(data.totals.inc);
      });
    },

    getPercentage: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      return allPerc;
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
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
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
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      console.log(obj.description);

      // Insert HTML to the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
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

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '----';
      }
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

    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrDeleteItem);
  };

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. return the budget
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget
    UIctrl.displayBudget(budget);
  };

  var updatePercentage = function() {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();
    // 2. read percentages from the budget controller
    var percentages = budgetCtrl.getPercentage();
    // 3. update UI
    console.log(percentages);
  };

  // function when input button is clicked
  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the filed input data
    input = UIctrl.getinput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UIctrl.addNewItem(newItem, input.type);

      // 4. Clear the fields
      UIctrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();

      // 6. Update percentages
      updatePercentage();
    }
  };

  var ctrDeleteItem = function(event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemID);

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. Delete item from data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. Delete the item from the UI
      UIctrl.deleteListItem(itemID);

      // 3. Update and sho the new budget
      updateBudget();

      // 4. Update percentages
      updatePercentage();
    }
  };

  //init
  return {
    init: function() {
      console.log('App has started');
      UIctrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
