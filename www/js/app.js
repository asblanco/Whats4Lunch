// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.controllers' is found in controllers folder
angular
.module('starter', ['ionic', 'starter.controllers', 'underscore', 'templates'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider 
    
//-------------------- Page 0 -----------------------
  
  .state('home', {
    url: "/home",
    templateUrl: "templates/home.html"
  })    
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/homeButton.html",
    controller: 'appCtrl'
  })
  
//-------------------- Page 1 -----------------------
  //Page showed from Search button
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/search.html",
          controller: 'searchCtrl'
        }
      }
    })

  //Page showed from I have button
  .state('app.kitchen', {
    url: "/kitchen",
    views: {
      'menuContent': {
        templateUrl: "templates/kitchen.html",
        controller: 'kitchenCtrl'
      }
    }
  })
  
  //Page showed from random button
  .state('app.random', {
    url: "/random/:recipeId",
    views: {
      'menuContent': {
        templateUrl: "templates/recipeDetailsRandom.html",
        controller: 'recipeDetailsCtrl'
      }
    }
  })
  
//-------------------- Page 2 -----------------------
  .state('app.recipeDetails', {
    url: "/recipeList/:recipeId",
    views: {
      'menuContent': {
        templateUrl: "templates/recipeDetails.html",
        controller: 'recipeDetailsCtrl'
      }
    }
  });
    
    //if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
    
    //Activate native scroll on all the app
    if(!ionic.Platform.isIOS())
        $ionicConfigProvider.scrolling.jsScrolling(false); 
});
