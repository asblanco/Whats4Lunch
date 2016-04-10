angular
.module('w4l.controllers', ['w4l.filters'])

//URL /app
.controller('appCtrl', function($scope, $recipeFactory, appFactory) {
    $scope.recipes = appFactory.allRecipes();

    function getIngredients() {
      IngredientsModel.all()
          .then(function (result) {
              $scope.ingredients = result.data.data;
          });
    }
  
    $scope.icon = "";
    $scope.actionIcon = "";
    $scope.selectedRecipe = 0;

    $scope.actualView = function(cIcon){
        $scope.icon = cIcon;
    };
    
    $scope.modalIcon = function(aIcon){
        $scope.actionIcon = aIcon;
    };
    
    //Enter in the details of a recipe
    $scope.selectRecipe = function(sRec){
        $scope.selectedRecipe = sRec;
        
        $scope.details = appFactory.getRecipeDetails(sRec);
        $scope.recipeIngredients = appFactory.getRecipeIngredients(sRec);
        $scope.instructions = appFactory.getRecipeInstructions(sRec);
    };
    
    //Create a random number to select a random recipe
    $scope.randomRecipe = function(){
        $scope.selectedRecipe = _.random(0,5); //Underscore.js random function
        $scope.recipeDetails = $recipeFactory.getRecipe($scope.selectedRecipe);
    };
    
    $scope.recipeList = $recipeFactory.all();
    
//    $scope.ingredientsCheckList = $recipeFactory.getIng(); 
    $scope.ingredientsCheckList = $scope.ingredients; 
});