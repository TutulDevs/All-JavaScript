
// Part 1: Budget Calculation & displaying on UI
// Part 2: Removing items and update calculation
// Part 3: Percentages for the expenses
// Part 4: Finishing up some design touches (adding +/-, month, changing color)

// Part 4
//  Budget Controller
let budgetCtrl = (function () {
    // Two Constructor for data-structure
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else {
            this.percentage = -1;
        };
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Store the collected data here/data structure
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    };

    let calcTotal = function (type) {
        let sum = 0;

        data.allItems[type].forEach(function (cur){
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            // Create a new ID
            if (data.allItems[type] > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            }else {
                ID = 0;
            }

            // Create new item based on type
            if (type === 'inc') {
                newItem = new Income (ID, des, val);
            }else if (type === 'exp') {
                newItem = new Expense (ID, des, val);
            };

            // Push data into our data structure
            data.allItems[type].push(newItem);

            return newItem;
        },

        // we'll identify which item deleted by their type & id
        deleteItem: function (type, id) {
            // id = 6
            //data.allItems[type][id]
            // ids = [1, 2, 4, 6, 8]
            // index = 3

            let ids, index;

            ids = data.allItems[type].map(function(current){
                // return the current id in the array
                return current.id;
            });

            // Return the id from the ids array
            index = ids.indexOf(id);

            // IF the id is found delete or not
            if (index !== -1) {
                //.splice(position No at which we start deleteing, number of elements we want to delete)
                data.allItems[type].splice(index, 1);
            };

        },

        calculateBudget: function () {
            //Calcuate the totals of inc & exp
            calcTotal('inc');
            calcTotal('exp');

            // Get the budget
            data.budget = data.totals.inc - data.totals.exp;
            
            // Get the percentage
            // IF the inc is 0, it wont show the percentage
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

            }else {
                data.percentage = -1;
            };
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        calculatePercentages: function () {
            // Calculate the percentage FOR EACH of the elements
            data.allItems.exp.forEach(function (cur) {
                // Pass the totalIncome in the method
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            // Store all the percentages of exp in an array
            let allPercengates = data.allItems.exp.map(function (cur) {
                // Return the getPercentage prototype method
                return cur.getPercentage();
            });

            // Now return the array to display
            return allPercengates;
        },

        testing: function () {
            console.log(data);
        }
    };
})();

//  UI Controller
let UICtrl = (function () {
    let DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budget: '.budget__value',
        totalInc: '.budget__income--value',
        totalExp: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container',
        expPercentageLabel: '.item__percentage',
        monthLabel: '.budget__title--month'
    };

    let formatNumber = function (num, type) {
        let numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);   // 2345 -> 2345.00

        numSplit = num.split('.');  // ['2345', '00']
        dec = numSplit[1];  // 00

        int = numSplit[0];  // 2345
        if (int.length > 3) {
            int = int.substr(0, int.length -3) + ',' + int.substr(int.length -3, 3);    // 2345 --> 2,345
        }

        // return the formatted string
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };


    // Create our own forEach for looping through the nodeList
    let nodeListForEach = function (list, callback) {
        for (let i = 0; i< list.length; i++) {
            callback(list[i], i);
        }
    };    

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            let html, element, newHtml;

            if (type === 'inc') {
                element = DOMstring.incomeContainer;

                html = '<div class="item" id="inc-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            }else if (type = 'exp') {
                element = DOMstring.expensesContainer;

                html = '<div class="item" id="exp-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">%p%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            };

            // Replace the placeholder with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('&description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //  Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {
            // we need find the parent to delete/remove the child

            let el = document.getElementById(selectorID); 
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            // Clear all elements of fieldsArr 
            fieldsArr.forEach(function (current) {
                current.value = '';
            });

            // Focus on the first input field
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            //  Pass the getBudget()
            document.querySelector(DOMstring.budget).textContent = formatNumber(obj.budget);
            document.querySelector(DOMstring.totalInc).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstring.totalExp).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstring.percentage).textContent = obj.percentage + '%';
            }else {
                document.querySelector(DOMstring.percentage).textContent = '---';
            }
        },

        displayPercentage: function (percentages) {
            let fields = document.querySelectorAll(DOMstring.expPercentageLabel);

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                }else {
                    current.textContent = '---';
                };
            });
        },

        displayMonth: function () {
            let now, year, months;
            now = new Date();
            year = now.getFullYear();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            
            document.querySelector(DOMstring.monthLabel).textContent = months[month] + ', ' +year;
        },

        changeType: function () {
            let fields = document.querySelectorAll(
                DOMstring.inputType + ',' +
                DOMstring.inputDescription + ',' +
                DOMstring.inputValue
            );

            nodeListForEach (fields, function (current) {
                current.classList.toggle('red-focus');
            });

            // the button
            document.querySelector(DOMstring.addBtn).classList.toggle('red');
        },

        getDOMstring: function () {
            return DOMstring;
        }
    };

}) ();

//  Main App Controller
let controller = (function (BC, UIC) {
    
    let setEvents = function () {
        //pass the DOMstring in this module
        let DOM = UIC.getDOMstring();

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        // Delete an item 
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        // Change the color based on type
        document.querySelector(DOM.inputType).addEventListener('change', UIC.changeType);
    };

    // Things we are going to add will pass into the setEvents
    let ctrlAddItem = function () {
        let input, newItem;
        //1. Get the input data
        input = UIC.getInput();
        //console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = BC.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UIC.addListItem(newItem, input.type);

            //4. Clear the fields
            UIC.clearFields();

            //5. Call & Calculate the budget
            updateBudget();

            //6. Update the percentages of EXP
            updatePercentages();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(itemID);

        // IF the item has the ID, it'll do below instruction
        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]); // converted from a string to a number w/o decimal

            //1. Delete the item from the data structure
            BC.deleteItem(type, ID);

            //2. Delete the item from the UI
            UIC.deleteListItem(itemID);

            //3. Update & show the new budget
            updateBudget();

            //4. Update the percentages of EXP
            updatePercentages();
        };
    };

    let updateBudget = function () {
        //1. Calculate budget
        BC.calculateBudget();

        //2. Return the budget in this module
        let budget = BC.getBudget();

        //3. Display the budget on UI
        UIC.displayBudget(budget);
    };

    let updatePercentages = function () {
        //1. Update in BC
        BC.calculatePercentages();

        //2. Return it in an array
        let percentages = BC.getPercentages();

        //3. Update in UIC
        UIC.displayPercentage(percentages);
    };

    //  return the eventListener since it's in IIFE
    return {
        init: function () {
            console.log('App Initialized...');

            UIC.displayMonth();

            UIC.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });

            setEvents();
        }
    };
    
}) (budgetCtrl, UICtrl);

controller.init();



/*  // Part 3 : Percentages
//  Budget Controller
let budgetCtrl = (function () {
    // Two Constructor for data-structure
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else {
            this.percentage = -1;
        };
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Store the collected data here/data structure
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    };

    let calcTotal = function (type) {
        let sum = 0;

        data.allItems[type].forEach(function (cur){
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            // Create a new ID
            if (data.allItems[type] > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            }else {
                ID = 0;
            }

            // Create new item based on type
            if (type === 'inc') {
                newItem = new Income (ID, des, val);
            }else if (type === 'exp') {
                newItem = new Expense (ID, des, val);
            };

            // Push data into our data structure
            data.allItems[type].push(newItem);

            return newItem;
        },

        // we'll identify which item deleted by their type & id
        deleteItem: function (type, id) {
            // id = 6
            //data.allItems[type][id]
            // ids = [1, 2, 4, 6, 8]
            // index = 3

            let ids, index;

            ids = data.allItems[type].map(function(current){
                // return the current id in the array
                return current.id;
            });

            // Return the id from the ids array
            index = ids.indexOf(id);

            // IF the id is found delete or not
            if (index !== -1) {
                //.splice(position No at which we start deleteing, number of elements we want to delete)
                data.allItems[type].splice(index, 1);
            };

        },

        calculateBudget: function () {
            //Calcuate the totals of inc & exp
            calcTotal('inc');
            calcTotal('exp');

            // Get the budget
            data.budget = data.totals.inc - data.totals.exp;
            
            // Get the percentage
            // IF the inc is 0, it wont show the percentage
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

            }else {
                data.percentage = -1;
            };
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        calculatePercentages: function () {
            // Calculate the percentage FOR EACH of the elements
            data.allItems.exp.forEach(function (cur) {
                // Pass the totalIncome in the method
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            // Store all the percentages of exp in an array
            let allPercengates = data.allItems.exp.map(function (cur) {
                // Return the getPercentage prototype method
                return cur.getPercentage();
            });

            // Now return the array to display
            return allPercengates;
        },

        testing: function () {
            console.log(data);
        }
    };
})();

//  UI Controller
let UICtrl = (function () {
    let DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budget: '.budget__value',
        totalInc: '.budget__income--value',
        totalExp: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container',
        expPercentageLabel: '.item__percentage'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            let html, element, newHtml;

            if (type === 'inc') {
                element = DOMstring.incomeContainer;

                html = '<div class="item" id="inc-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            }else if (type = 'exp') {
                element = DOMstring.expensesContainer;

                html = '<div class="item" id="exp-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">%p%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            };

            // Replace the placeholder with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('&description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //  Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {
            // we need find the parent to delete/remove the child

            let el = document.getElementById(selectorID); 
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            // Clear all elements of fieldsArr 
            fieldsArr.forEach(function (current) {
                current.value = '';
            });

            // Focus on the first input field
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            //  Pass the getBudget()
            document.querySelector(DOMstring.budget).textContent = '+ ' +  obj.budget;
            document.querySelector(DOMstring.totalInc).textContent = '+ ' + obj.totalInc;
            document.querySelector(DOMstring.totalExp).textContent = '- ' + obj.totalExp;
            document.querySelector(DOMstring.percentage).textContent = obj.percentage + '%';
        },

        displayPercentage: function (percentages) {
            let fields = document.querySelectorAll(DOMstring.expPercentageLabel);

            // Create our own forEach for looping through the nodeList
            let nodeListForEach = function (list, callback) {
                for (let i = 0; i< list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                }else {
                    current.textContent = '---';
                };
            });
        },

        getDOMstring: function () {
            return DOMstring;
        }
    };

}) ();

//  Main App Controller
let controller = (function (BC, UIC) {
    
    let setEvents = function () {
        //pass the DOMstring in this module
        let DOM = UIC.getDOMstring();

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        // Delete an item 
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    // Things we are going to add will pass into the setEvents
    let ctrlAddItem = function () {
        let input, newItem;
        //1. Get the input data
        input = UIC.getInput();
        //console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = BC.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UIC.addListItem(newItem, input.type);

            //4. Clear the fields
            UIC.clearFields();

            //5. Call & Calculate the budget
            updateBudget();

            //6. Update the percentages of EXP
            updatePercentages();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(itemID);

        // IF the item has the ID, it'll do below instruction
        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]); // converted from a string to a number w/o decimal

            //1. Delete the item from the data structure
            BC.deleteItem(type, ID);

            //2. Delete the item from the UI
            UIC.deleteListItem(itemID);

            //3. Update & show the new budget
            updateBudget();

            //4. Update the percentages of EXP
            updatePercentages();
        };
    };

    let updateBudget = function () {
        //1. Calculate budget
        BC.calculateBudget();

        //2. Return the budget in this module
        let budget = BC.getBudget();

        //3. Display the budget on UI
        UIC.displayBudget(budget);
    };

    let updatePercentages = function () {
        //1. Update in BC
        BC.calculatePercentages();

        //2. Return it in an array
        let percentages = BC.getPercentages();

        //3. Update in UIC
        UIC.displayPercentage(percentages);
    };

    //  return the eventListener since it's in IIFE
    return {
        init: function () {
            console.log('App Initialized...');

            UIC.displayBudget({
                budget: '0.00',
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });

            setEvents();
        }
    };
    
}) (budgetCtrl, UICtrl);

controller.init();
*/

/*// Part 2 Removing Items
//  Budget Controller
let budgetCtrl = (function () {
    // Two Constructor for data-structure
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Store the collected data here/data structure
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    };

    let calcTotal = function (type) {
        let sum = 0;

        data.allItems[type].forEach(function (cur){
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            // Create a new ID
            if (data.allItems[type] > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            }else {
                ID = 0;
            }

            // Create new item based on type
            if (type === 'inc') {
                newItem = new Income (ID, des, val);
            }else if (type === 'exp') {
                newItem = new Expense (ID, des, val);
            };

            // Push data into our data structure
            data.allItems[type].push(newItem);

            return newItem;
        },

        // we'll identify which item deleted by their type & id
        deleteItem: function (type, id) {
            // id = 6
            //data.allItems[type][id]
            // ids = [1, 2, 4, 6, 8]
            // index = 3

            let ids, index;

            ids = data.allItems[type].map(function(current){
                // return the current id in the array
                return current.id;
            });

            // Return the id from the ids array
            index = ids.indexOf(id);

            // IF the id is found delete or not
            if (index !== -1) {
                //.splice(position No at which we start deleteing, number of elements we want to delete)
                data.allItems[type].splice(index, 1);
            };

        },

        calculateBudget: function () {
            //Calcuate the totals of inc & exp
            calcTotal('inc');
            calcTotal('exp');

            // Get the budget
            data.budget = data.totals.inc - data.totals.exp;
            
            // Get the percentage
            // IF the inc is 0, it wont show the percentage
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

            }else {
                data.percentage = -1;
            };
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    };
})();

//  UI Controller
let UICtrl = (function () {
    let DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budget: '.budget__value',
        totalInc: '.budget__income--value',
        totalExp: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            let html, element, newHtml;

            if (type === 'inc') {
                element = DOMstring.incomeContainer;

                html = '<div class="item" id="inc-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            }else if (type = 'exp') {
                element = DOMstring.expensesContainer;

                html = '<div class="item" id="exp-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">%p%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            };

            // Replace the placeholder with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('&description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //  Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {
            // we need find the parent to delete/remove the child

            let el = document.getElementById(selectorID); 
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            // Clear all elements of fieldsArr 
            fieldsArr.forEach(function (current) {
                current.value = '';
            });

            // Focus on the first input field
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            //  Pass the getBudget()
            document.querySelector(DOMstring.budget).textContent = '+ ' +  obj.budget;
            document.querySelector(DOMstring.totalInc).textContent = '+ ' + obj.totalInc;
            document.querySelector(DOMstring.totalExp).textContent = '- ' + obj.totalExp;
            document.querySelector(DOMstring.percentage).textContent = obj.percentage + '%';
        },

        getDOMstring: function () {
            return DOMstring;
        }
    };

}) ();

//  Main App Controller
let controller = (function (BC, UIC) {
    
    let setEvents = function () {
        //pass the DOMstring in this module
        let DOM = UIC.getDOMstring();

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        // Delete an item 
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    // Things we are going to add will pass into the setEvents
    let ctrlAddItem = function () {
        let input, newItem;
        //1. Get the input data
        input = UIC.getInput();
        //console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = BC.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UIC.addListItem(newItem, input.type);

            //4. Clear the fields
            UIC.clearFields();

            //5. Call & Calculate the budget
            updateBudget();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(itemID);

        // IF the item has the ID, it'll do below instruction
        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]); // converted from a string to a number w/o decimal

            //1. Delete the item from the data structure
            BC.deleteItem(type, ID);

            //2. Delete the item from the UI
            UIC.deleteListItem(itemID);

            //3. Update & show the new budget
            updateBudget();

            //4. Update & show the new Percentages
        };
    };

    let updateBudget = function () {
        //1. Calculate budget
        BC.calculateBudget();

        //2. Return the budget in this module
        let budget = BC.getBudget();

        //3. Display the budget on UI
        UIC.displayBudget(budget);
    };

    //  return the eventListener since it's in IIFE
    return {
        init: function () {
            console.log('App Initialized...');

            UIC.displayBudget({
                budget: '0.00',
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });

            setEvents();
        }
    };
    
}) (budgetCtrl, UICtrl);

controller.init();
*/

/* // Part : 1 
//  Budget Controller
let budgetCtrl = (function () {
    // Two Constructor for data-structure
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Store the collected data here/data structure
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    };

    let calcTotal = function (type) {
        let sum = 0;

        data.allItems[type].forEach(function (cur){
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            // Create a new ID
            if (data.allItems[type] > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            }else {
                ID = 0;
            }

            // Create new item based on type
            if (type === 'inc') {
                newItem = new Income (ID, des, val);
            }else if (type === 'exp') {
                newItem = new Expense (ID, des, val);
            };

            // Push data into our data structure
            data.allItems[type].push(newItem);

            return newItem;
        },

        calculateBudget: function () {
            //Calcuate the totals of inc & exp
            calcTotal('inc');
            calcTotal('exp');

            // Get the budget
            data.budget = data.totals.inc - data.totals.exp;
            
            // Get the percentage
            // IF the inc is 0, it wont show the percentage
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

            }else {
                data.percentage = -1;
            };
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    };
})();

//  UI Controller
let UICtrl = (function () {
    let DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budget: '.budget__value',
        totalInc: '.budget__income--value',
        totalExp: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            let html, element, newHtml;

            if (type === 'inc') {
                element = DOMstring.incomeContainer;

                html = '<div class="item" id="income-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            }else if (type = 'exp') {
                element = DOMstring.expensesContainer;

                html = '<div class="item" id="expense-%id%"><div class="item__description">&description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">%p%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div></div></div>';
            };

            // Replace the placeholder with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('&description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //  Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            // Clear all elements of fieldsArr 
            fieldsArr.forEach(function (current) {
                current.value = '';
            });

            // Focus on the first input field
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            //  Pass the getBudget()
            document.querySelector(DOMstring.budget).textContent = '+ ' +  obj.budget;
            document.querySelector(DOMstring.totalInc).textContent = '+ ' + obj.totalInc;
            document.querySelector(DOMstring.totalExp).textContent = '- ' + obj.totalExp;
            document.querySelector(DOMstring.percentage).textContent = obj.percentage + '%';
        },

        getDOMstring: function () {
            return DOMstring;
        }
    };

}) ();

//  Main App Controller
let controller = (function (BC, UIC) {
    
    let setEvents = function () {
        //pass the DOMstring in this module
        let DOM = UIC.getDOMstring();

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    // Things we are going to add will pass into the setEvents
    let ctrlAddItem = function () {
        let input, newItem;
        //1. Get the input data
        input = UIC.getInput();
        //console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = BC.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UIC.addListItem(newItem, input.type);

            //4. Clear the fields
            UIC.clearFields();

            //5. Call & Calculate the budget
            updateBudget();
        }
    };

    let updateBudget = function () {
        //1. Calculate budget
        BC.calculateBudget();

        //2. Return the budget in this module
        let budget = BC.getBudget();

        //3. Display the budget on UI
        UIC.displayBudget(budget);
    };

    //  return the eventListener since it's in IIFE
    return {
        init: function () {
            console.log('App Initialized...');

            UIC.displayBudget({
                budget: '0.00',
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });

            setEvents();
        }
    };
    
}) (budgetCtrl, UICtrl);

controller.init();

*/