import { budgetController } from './modules/budgetController.js';
import { UIController } from './modules/UIController.js';

// App Controller
const controller = ((budgetCtrl, UICtrl) => {
  const DOM = UICtrl.getDOMstrings();

  const ctrlAddItem = () => {
    // 1. Get the filed input data
    console.log(UICtrl.getInput());

    // 2. Add item to budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget
  };

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem());

  document.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
