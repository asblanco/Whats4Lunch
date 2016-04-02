angular
.module('w4l.controllers', ['w4l.filters', 'w4l.factories'])

//URL /app
.controller('appCtrl', function($scope, $recipeFactory, ItemsModel) {
    $scope.icon = "";
    $scope.actionIcon = "";
    $scope.selectedRecipe = 0;
    $scope.recipeDetails = "";

    $scope.actualView = function(cIcon){
        $scope.icon = cIcon;
    };
    
    $scope.modalIcon = function(aIcon){
        $scope.actionIcon = aIcon;
    };
    
    //Function to enter in the details of a recipe
    $scope.selectRecipe = function(sRec){
        $scope.selectedRecipe = sRec;
        $scope.recipeDetails = $recipeFactory.getRecipe($scope.selectedRecipe);
    };
    
    //Create a random number to select a random recipe
    $scope.randomRecipe = function(){
        $scope.selectedRecipe = _.random(0,5); //Underscore.js random function
        $scope.recipeDetails = $recipeFactory.getRecipe($scope.selectedRecipe);
    };
    
    $scope.recipeList = $recipeFactory.all();
    
    $scope.ingredientsCheckList = $recipeFactory.getIng(); 
  
    var vm = this;
    function getAll() {
      ItemsModel.all()
          .then(function (result) {
              vm.data = result.data.data;
          });
    }
    getAll();
});