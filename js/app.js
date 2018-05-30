// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services',])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     $.ajax({ 
              type: 'GET', 
              url: 'http://rku.utem.edu.my/webserviceJSON/LabTest.php', 
              data: { selectLogic: "fnGetElectTariff" }, 
              dataType: 'json',
              success: function (data) { 
                $("#first_usage").val(data['varFirst200']) ;   
                $("#after_usage").val(data['varNext200']) ;                 
              }
          });

      var myDB = window.sqlitePlugin.openDatabase({name: "EletricityCalcDB.db", location: 'default'});

      myDB.transaction(function(transaction) 
      {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS Bill (id integer primary key, prev_month text, curr_month text, total_price text)',
          [],
          function(tx, result) 
          {
            alert("Table created successfully");
          },
          function(error) 
          {
            alert("Error occurred while creating the table.");
          });
      });

      myDB.transaction(function(transaction) {
      transaction.executeSql('SELECT * FROM Bill', [], function (tx, results) 
      {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++)
        {
          $("#previous_month").val(results.rows.item(i).prev_month);
          $("#current_month").val(results.rows.item(i).curr_month);
          $("#total_price").val(results.rows.item(i).total_price);
        }
      }, null);
      });

  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});