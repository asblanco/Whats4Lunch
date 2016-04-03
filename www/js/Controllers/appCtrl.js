angular
.module('w4l.controllers', ['w4l.filters', 'w4l.factories'])

//URL /app
.controller('appCtrl', function($scope, $recipeFactory, RecipesModel, Recipes_IngredientsModel, IngredientsModel, InstructionsModel, LevelsModel, CategoriesModel) {
    var vm = this;
    function getAll() {
      RecipesModel.all()
          .then(function (result) {
              vm.data = result.data.data;
          });
    }
    function getDetails(recipeId) {
      RecipesModel.fetch(recipeId)
          .then(function (result) {
              vm.details = result.data.data[0];
              vm.details2 = vm.details.__metadata.descriptives;
          });
    }
    function getIngredients(recipeId) {
      Recipes_IngredientsModel.fetchIngredients(recipeId)
          .then(function (result) {
              vm.ingredients = result.data.data;
          });
    }
    function getInstructions(recipeId) {
      InstructionsModel.fetchInstructions(recipeId)
          .then(function (result) {
              vm.instructions = result.data.data;
          });
    }
    getAll();
  
    $scope.icon = "";
    $scope.actionIcon = "";
    $scope.selectedRecipe = 0;
    $scope.recipeDetails = "";
    $scope.recipeIngredients = "";
    $scope.recipeInstructions = "";

    $scope.actualView = function(cIcon){
        $scope.icon = cIcon;
    };
    
    $scope.modalIcon = function(aIcon){
        $scope.actionIcon = aIcon;
    };
    
    //Enter in the details of a recipe
    $scope.selectRecipe = function(sRec){
        $scope.selectedRecipe = sRec;
//      $scope.recipeDetails = $recipeFactory.getRecipe($scope.selectedRecipe);
        getDetails(sRec);
        getIngredients(sRec);
        getInstructions(sRec);
    };
    
    //Create a random number to select a random recipe
    $scope.randomRecipe = function(){
        $scope.selectedRecipe = _.random(0,5); //Underscore.js random function
        $scope.recipeDetails = $recipeFactory.getRecipe($scope.selectedRecipe);
    };
    
    $scope.recipeList = $recipeFactory.all();
    
    $scope.ingredientsCheckList = $recipeFactory.getIng(); 
});