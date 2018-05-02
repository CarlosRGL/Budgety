// Budget Controller
export const budgetController = (() => {
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
