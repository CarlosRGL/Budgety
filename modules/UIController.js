//UI Controller
export const UIController = (() => {
  return {
    getInput: () => {
      return {
        type: document.querySelector('.add__type').value,
        description: document.querySelector('.add__description').value,
        value: document.querySelector('.add__value').value
      };
    }
  };
})();
