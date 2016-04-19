angular
.module('w4l.controllers', ['w4l.filters'])

//URL /app
.controller('appCtrl', function($scope, appFactory) {
    $scope.recipes = appFactory.allRecipes();
    $scope.selectedRecipe = 1;
    
    //Load details of a recipe
    $scope.selectRecipe = function(sRec){
        $scope.selectedRecipe = sRec;

        $scope.recipeDetails = appFactory.getRecipeDetails(sRec);
        $scope.recipeIngredients = appFactory.getRecipeIngredients(sRec);
        $scope.instructions = appFactory.getRecipeInstructions(sRec);
    };
    
    //Create a random number to select a random recipe
    $scope.randomRecipe = function(){
        $scope.selectedRecipe = _.random(1, $scope.recipes.size); //Underscore.js random function
        $scope.selectRecipe($scope.selectedRecipe);
    };

    $scope.ingredientsCheckList = $scope.ingredients; 
});