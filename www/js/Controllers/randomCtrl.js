angular
.module('w4l.controllers')

.controller('randomCtrl', function($scope, appFactory) {
    //The first time it loads the recipe ID 1
    $scope.selectedRecipe = 1;
    var sRec = $scope.selectedRecipe;

    $scope.recipeDetails = appFactory.getRecipeDetails(sRec);
    $scope.recipeIngredients = appFactory.getRecipeIngredients(sRec);
    $scope.instructions = appFactory.getRecipeInstructions(sRec);

    var nRecipes; //Number of recipes to generate a random ID
    
    appFactory.numRecipes().then(function(response){
        nRecipes = response;
        $scope.randomRecipe = function(){
            //Create a random number to select a random recipe
            $scope.selectedRecipe = _.random(1, nRecipes); //Underscore.js random function
            sRec = $scope.selectedRecipe;
            //Load details of a recipe
            $scope.recipeDetails = appFactory.getRecipeDetails(sRec);
            $scope.recipeIngredients = appFactory.getRecipeIngredients(sRec);
            $scope.instructions = appFactory.getRecipeInstructions(sRec);
        };
    });
});

/* Because it needs a promise to wait for the number of recipes, it can't display the first time a random recipe (it is not yet fully loaded), so it shows always the ID 1 */