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

	var data = {
		allItems:{
			exp: [],
			inc:[]
		},
		totals: {
			exp: 0,
			inc: 0
		}
	}

})();







// UI Controller
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    return{
     getInput: function(){
        return{
			type : document.querySelector(DOMstrings.inputType).value,
			description : document.querySelector(DOMstrings.inputDescription).value,
			value : document.querySelector(DOMstrings.inputValue).value				
			};
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
  var ctrlAddItem = function(){

	// 1. Get the field input data
	var input = UICtrl.getInput();
		
	// 2.Add the item to the Budget Controller
	// 3.Add the item to the UI
	// 4.Calculate the budget
	// 5.Display the budget on the UI	

   };

   return {
	init: function(){
		console.log('Application has started');
		setupEventListeners();
        }
	};
})(budgetController, UIController);

controller.init();