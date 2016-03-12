angular
.module('starter.factories', [])

.factory('$recipeFactory', function() {
        
    var recipeList = 
    [
        { 
            id: 0, title: 'Espaguetis', 
            details: 'Delicious dish', 
            cat: 'Pasta', dif: 'Low', time: 20, 
            img: 'img/espaguetis-carbonara.jpg', 
            ing: ['Pasta','Cream', 'Salt', 'Onion', 'Bacon'],
            dir: 
            [
                '1. In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.',
                '2. In a big saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.'
            ]
        },
        { 
            id: 1, title: 'Chicken Breasts',
            details: 'Delicious dish', 
            cat: 'Meat', dif: 'Medium', time: 30, 
            img: 'img/chicken.jpg', 
            ing: ['Chicken','Garlic', 'Salt'],
            dir: 
            [
                '1. In a big saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.',
                'Preheat oven to 425 degrees F (220 degrees C)'
            ]
        },
        { 
            id: 2 , title: 'Chili', 
            details: 'Chili dish',
            cat: 'Vegetables', dif: 'High', time: 30, 
            img: 'img/chili.jpg', 
            ing: ['Chili', 'Salt', 'Potatoes'],
            dir: 
            [
                '1. In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.',
                '2. In a medium saucepan, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.',
                '3. Preheat oven to 425 degrees F (200 degrees C)'
            ]
        },
        { 
            id: 3 , title: 'Turkey Cheeseburger Meatloaf', 
            details: 'Awesome Slow Cooker Pot Roast', 
            cat: 'Meat', dif: 'Medium', time: 25, 
            img: 'img/Turkey-Burger.jpg', 
            ing: ['Turkey', 'Salad', 'Tomato'],
            dir: 
            [
                '1. In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.',
                '2. Preheat oven to 425 degrees F (220 degrees C)'
            ]
        },
        { 
            id: 4 , title: 'Baked Teriyaki Chicken', 
            details: 'Delicious dish', 
            cat: 'Meat', dif: 'Medium', time: 46, 
            img: 'img/baked-teriyaki.jpg', 
            ing: ['Chicken', 'Salt', 'Vegetables'],
            dir: 
            [
                '1. In a big saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.',
                '2. Preheat oven to 425 degrees F (220 degrees C)'
            ]
        },
        { 
            id: 5 , title: 'Meatball Nirvana', 
            details: 'Delicious dish', 
            cat: 'Meat', dif: 'Low', time: 35, 
            img: 'img/meatballs.jpg', 
            ing: ['Meat', 'Salt', 'Sauce'],
            dir: 
            [
                '1. Preheat oven to 425 degrees F (220 degrees C)',
                '2. In a big saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.'
            ]
        }
    ]; 
    
    var ingredientsCheckList = 
    [
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
    
    return {
        all: function() {
            return recipeList;
        },
        getRecipe: function(recipeId) {
            // Simple index lookup
            return recipeList[recipeId];
        },
        getIng: function() {
            return ingredientsCheckList;
        }
    };
});