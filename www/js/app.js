angular
.module('w4l', ['ionic', 'backand', 'w4l.controllers', 'underscore'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, BackandProvider, $httpProvider, $ionicConfigProvider) {
  BackandProvider.setAppName('whats4lunch');
  BackandProvider.setSignUpToken('1b3af3f6-bf4c-44f9-9fa5-d1d886f96c48');
  BackandProvider.setAnonymousToken('b9616f50-b3b9-48fd-ad01-c9072d1c1338');
  
  $stateProvider  
//-------------------- Page 0 -----------------------
  .state('home', {
    url: "/home",
    templateUrl: "templates/home.html"
  })    
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menuContent.html",
    controller: 'appCtrl'
  })
  
//-------------------- Page 1 -----------------------
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/search.html",
          controller: 'searchCtrl'
        }
      }
    })

  .state('app.kitchen', {
    url: "/kitchen",
    views: {
      'menuContent': {
        templateUrl: "templates/kitchen.html",
        controller: 'kitchenCtrl'
      }
    }
  })
  
  .state('app.random', {
    url: "/random/:recipeId",
    views: {
      'menuContent': {
        templateUrl: "templates/recipeDetailsRandom.html",
        controller: 'randomCtrl'
      }
    }
  })
  
//-------------------- Page 2 -----------------------
  .state('app.recipeDetails', {
    url: "/recipeList/:recipeId",
    views: {
      'menuContent': {
        templateUrl: "templates/recipeDetails.html"
      }
    }
  });
    
    //if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
    
    //Activate android native scroll on all the app
    if(!ionic.Platform.isIOS())
        $ionicConfigProvider.scrolling.jsScrolling(false); 
});
