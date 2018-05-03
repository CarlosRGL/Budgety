// Budget Controller
const budgetController = (() => {
  // Create Expenses Class
  class Expenses {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  // Create Income Class
  class Incomes {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  // Array to store Data
  const data = {
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
    addItem: (type, des, val) => {
      let ID, newItem;
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id - 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expenses(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Incomes(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  };
})();

//UI Controller
const UIController = (() => {
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };
  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: () => {
      return DOMstrings;
    }
  };
})();

const controller = ((budgetCtrl, UICtrl) => {
  // Setup events listenners for init functions
  const setupEventsListeners = () => {
    // Get classes from UI controllers
    const DOM = UICtrl.getDOMstrings();

    // Events listeners
    document
      .querySelector(DOM.inputBtn)
      .addEventListener('click', ctrlAddItem());

    document.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };

  const ctrlAddItem = () => {
    // 1. Get the filed input data
    const input = UICtrl.getInput();

    const newItem = budgetCtrl.addItem(
      input.type,
      input.description,
      input.value
    );

    console.table(newItem);

    // 2. Add item to budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget
  };

  return {
    init: () => {
      console.log('APP has started');
      return setupEventsListeners();
    }
  };
})(budgetController, UIController);

controller.init();
