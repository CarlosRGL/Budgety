// Budget Controller
const budgetController = (() => {})();

//UI Controller
const UIController = (() => {})();

// App Controller
const controller = ((budgetCtrl, UICtrl) => {
  const ctrlAddItem = () => {
    // 1. Get the filed input data
    // 2. Add item to budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget
  };

  document
    .querySelector('.add__btn')
    .addEventListener('click', function(event) {
      ctrlAddItem();
    });

  document.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
