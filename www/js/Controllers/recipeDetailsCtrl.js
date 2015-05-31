angular
.module('starter.controllers')

//URL /app/recipeList/:recipeId
.controller('recipeDetailsCtrl', function($scope) {

    $scope.directions = [
        {id: 1, dir: '1. In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.'},
        {id: 2, dir: '1. In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.'},
        {id: 3, dir: '1. In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.'},
        {id: 4, dir: '1. In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.'},
        {id: 5, dir: 'Preheat oven to 425 degrees F (220 degrees C)'},
        {id: 6, dir: 'Preheat oven to 425 degrees F (220 degrees C)'}
    ];
    
});