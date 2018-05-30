angular.module('app.controllers', [])
  
.controller('electricalUsageCalculatorCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$("#electricalUsageCalculator-button1").click(function()
	{
		var prevMonth = $("#previous_month").val();
		var currMonth = $("#current_month").val();
		var totkWh = currMonth - prevMonth;

		if (totkWh > 200) 
		{
			var totPrice = (200*$("#first_usage").val()) + ((totkWh-200)*$("#after_usage").val());
			alert(totkWh+"kWh Used");
		}
		else if (totkWh == 200)
		{
			var totPrice = (200*$("#first_usage").val());
			alert(totkWh+"kWh Used");
		}
		else if (totkWh<0) 
		{
			alert("Current Month must be more than Previous Month");
			$("#previous_month").val("");
			$("#current_month").val("");
		}
		else if ($("#previous_month").val()=="" ||$("#current_month").val()=="")
		{
			alert("Dont leave Current Month and Previous Month Empty");
		}
		else
		{
			var totPrice = (totkWh*$("#first_usage").val());
			alert(totkWh+"kWh Used");
		}

		$("#total_price").val(totPrice);

		var myDB = window.sqlitePlugin.openDatabase({name: "EletricityCalcDB.db", location: 'default'});

		myDB.transaction(function(transaction)
		{
			var executeQuery = "INSERT INTO Bill (prev_month, curr_month, total_price) VALUES (?,?,?)";
			transaction.executeSql(executeQuery, [prevMonth,currMonth,totPrice], 
			function(tx, result)
			{
				alert('inserted');
			},
			function(error)
			{
				alert('Error occured');
			});
		});

	});


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 