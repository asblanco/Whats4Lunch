angular
.module('starter.controllers', ['starter.filters'])

//URL /app
.controller('appCtrl', function($scope) {
    $scope.icon = "";
    $scope.actionIcon = "";
    $scope.selectedRecipe = 0;

    $scope.actualView = function(cIcon){
        $scope.icon = cIcon;
    };
    
    $scope.modalIcon = function(aIcon){
        $scope.actionIcon = aIcon;
    };
    
    //Function to enter in the details of a recipe
    $scope.selectRecipe = function(sRec){
      $scope.selectedRecipe = sRec;  
    };
    
    //Create a random number to select a random recipe
    $scope.randomRecipe = function(){
        //$scope.selectedRecipe = Math.floor((Math.random() * 6)); //between 0 and 5 javascript random function
        $scope.selectedRecipe = _.random(0,5); //Underscore.js random function
    };
    
    $scope.recipeList = [
        { id: 1, title: 'Espaguetis', details: 'Delicious dish', cat: 'Pasta', dif: 'Low', time: 20, img: 'img/espaguetis-carbonara.jpg', ing: ['Pasta','Cream', 'Salt', 'Onion', 'Bacon']},
        { id: 2 , title: 'Chicken Breasts', details: 'Delicious dish', cat: 'Meat', dif: 'Medium', time: 30, img: 'img/chicken.jpg', ing: ['Chicken','Garlic', 'Salt']},
        { id: 3 , title: 'Chili', details: 'Chili dish', cat: 'Vegetables', dif: 'High', time: 30, img: 'img/chili.jpg', ing: ['Chili', 'Salt', 'Potatoes']},
        { id: 4 , title: 'Turkey Cheeseburger Meatloaf', details: 'Awesome Slow Cooker Pot Roast', cat: 'Meat', dif: 'Medium', time: 25, img: 'img/Turkey-Burger.jpg', ing: ['Turkey', 'Salad', 'Tomato']},
        { id: 5 , title: 'Baked Teriyaki Chicken', details: 'Delicious dish', cat: 'Meat', dif: 'Medium', time: 46, img: 'img/baked-teriyaki.jpg', ing: ['Chicken', 'Salt', 'Vegetables']},
        { id: 6 , title: 'Meatball Nirvana', details: 'Delicious dish', cat: 'Meat', dif: 'Low', time: 35, img: 'img/meatballs.jpg', ing: ['Meat', 'Salt', 'Sauce']}
      ]; 
    
    $scope.ingredientsList = ["Pasta", "Onion", "Chicken", "Bacon", "Cream", "Salt", "Garlic", "Potatoes", "Chili", "Turkey", "Salad", "Tomato", "Meat", "Sauce"];
    $scope.ingredientsCheckList = [
        { name: "Pasta", checked: false},
        { name: "Onion", checked: false},
        { name: "Chicken", checked: false},
        { name: "Bacon", checked: false},
        { name: "Cream", checked: false},
        { name: "Salt", checked: false},
        { name: "Garlic", checked: false},
        { name: "Potatoes", checked: false},
        { name: "Chili", checked: false},
        { name: "Turkey", checked: false},
        { name: "Salad", checked: false},
        { name: "Tomato", checked: false},
        { name: "Meat", checked: false},
        { name: "Sauce", checked: false},
        
    ];
    
    $scope.ingredients = [
        {id: 1, ing: ['Pasta','Cream', 'Salt', 'Onion', 'Bacon']},
        {id: 2, ing: ['Chicken','Garlic', 'Salt']},
        {id: 3, ing: ['Chili', 'Salt', 'Potatoes']},
        {id: 4, ing: ['Turkey', 'Salad', 'Tomato']},
        {id: 5, ing: ['Chicken', 'Salt', 'Vegetables']},
        {id: 6, ing: ['Meat', 'Salt', 'Sauce']}
    ];
})