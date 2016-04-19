angular
.module('w4l.controllers')

.controller('randomCtrl', function($scope) {
    //Create a random number to select a random recipe
    $scope.randomRecipe = function(){
        $scope.selectedRecipe = _.random(1, $scope.recipes.size); //Underscore.js random function
        $scope.selectRecipe($scope.selectedRecipe);
    };
})