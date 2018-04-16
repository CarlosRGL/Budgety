import { budgetController } from './modules/budgetController.js';
import { UIController } from './modules/UIController.js';

// App Controller
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
