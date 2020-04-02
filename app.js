//********************How Modules Work Together*********************************//
//bare bones, architechture of the project
//IIFE

// // 1st module created
// var budgetController = (function(){
//    var x = 23;
//    var add = function(a){
//    	return x + a;
//    }
//    return{
//    	publicTest: function(b){
//    		return add(b);
//    	}
//    }
// })();


// //2nd module (ui)
// var UIController = (function(){

// })();


// //another module (controller module)
// //this module connect 1st & 2nd module
// //this module take 1st & 2nd module as arguments
// //1st & 2nd module ke arguments hishebe pass na koreo use kora jabe but not good practice

// var controller = (function(budgetCtrl, UICtrl){
// 	var z =budgetCtrl.publicTest(5);
// 	return {
// 		anotherPublic : function(){
// 			console.log(z);
// 		}
// 	}

// })(budgetController, UIController);
//******************************************************************************************************************************//



// Budget Controller
var budgetController = (function(){

	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function(type){
		var sum = 0;
		data.allItems[type].forEach(function(cur){
           sum += cur.value;
		});
		data.totals[type] = sum ;
	};

	var data = {
		allItems:{
			exp: [],
			inc:[]
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: function(type, des, val){
			var newItem, ID;
			//create new id
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}else{
				ID = 0;
			}
			

			//create new item based on 'inc' or  'exp' type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			}else if(type === 'inc'){
				newItem = new Income(ID, des, val);
			}

			//push it into our data structure
			data.allItems[type].push(newItem);

			//return the new element
			return newItem;
		},

		calculateBudget: function(){
			//calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			//calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			//calculate the percentage of income that we spent 

			if(data.totals.inc > 0){
               data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
			}else{
				data.percentage = -1 ;
			}
			

		},
		getBudget: function(){
			return{
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};

		},
		testing : function(){
			console.log(data);
		}
	};

})();







// UI Controller
var UIController = (function(){
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage'
	};
    return{
     getInput: function(){
        return{
			type : document.querySelector(DOMstrings.inputType).value,
			description : document.querySelector(DOMstrings.inputDescription).value,
			value : parseFloat( document.querySelector(DOMstrings.inputValue).value)				
			};
        },
        addListItem: function(obj, type){
        	var html, newHtml, element;

        	// Create HTML string with placeholder text
        	if (type === 'inc') {
        		element = DOMstrings.incomeContainer;

        		html = '<div class="item clearfix" id="income-%d%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        	} else if (type === 'exp') {
        		element = DOMstrings.expensesContainer;

        		html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        	}

            //Replace the placeholder text with some actual data

            newHtml = html.replace('%d%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

        	//Insert the HTML into the DOM
        	document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function(){
        	var fields, fieldsArr;
        	fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
        	fieldsArr = Array.prototype.slice.call(fields);

        	fieldsArr.forEach(function(current, index, array){
        		current.value = "";
        	});
        	fieldsArr[0].focus();
        },
        displayBudget: function(obj){
        	document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
        	document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
        	document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
        	

        	if (obj.percentage > 0) {
        		document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';

        	}else {
        		document.querySelector(DOMstrings.percentageLabel).textContent = '---';

        	}

        },

	 getDOMstrings: function(){
			return DOMstrings;
		}
	}
})();






// Global App Controller

var controller = (function(budgetCtrl, UICtrl){
	var setupEventListeners = function(){
		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function(event){
			if (event.keyCode=== 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	}

	var updateBudget = function(){

  		// 1.Calculate the budget
  		budgetCtrl.calculateBudget();

  		//2. return the budget
  		var budget = budgetCtrl.getBudget();

	// 3.Display the budget on the UI
	    UICtrl.displayBudget(budget);
};

var ctrlAddItem = function(){

	var input, newItem;

	// 1. Get the field input data
	input = UICtrl.getInput();

	if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
	// 2.Add the item to the Budget Controller
	newItem =  budgetCtrl.addItem(input.type, input.description, input.value);
	// 3.Add the item to the UI
	UICtrl.addListItem(newItem, input.type);

	//4. Clear the fields
	UICtrl.clearFields();
	//5. Calculate and update budget
	updateBudget();
}
};

return {
	init: function(){
		console.log('Application has started');
		UICtrl.displayBudget({
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