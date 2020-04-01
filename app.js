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



// 1st module created
var budgetController = (function(){
   var x = 23;
   var add = function(a){
   	return x + a;
   }
   return{
   	publicTest: function(b){
   		return add(b);
   	}
   }
})();


//2nd module (ui)
var UIController = (function(){

})();


//another module (controller module)
//this module connect 1st & 2nd module
//this module take 1st & 2nd module as arguments
//1st & 2nd module ke arguments hishebe pass na koreo use kora jabe but not good practice

var controller = (function(budgetCtrl, UICtrl){
	var z =budgetCtrl.publicTest(5);
	return {
		anotherPublic : function(){
			console.log(z);
		}
	}

})(budgetController, UIController);