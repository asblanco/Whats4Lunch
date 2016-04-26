angular
.module('w4l.controllers')

.controller('kitchenCtrl', function($scope, $ionicModal, kitchenFactory, appFactory) {
    $scope.recipesK = []; //Recipes that shows on the view
    var recipes = []; //All the recipes
    $scope.ingredients = []; //Ingredients that shows on the view
    var checkIng = []; //Saved check list of ingredients
    var nRecipes; //Number of recipes
    var nCheckIng = 0;
    
    //Promise to get the list of recipes
    appFactory.allRecipes().then(function(response){
        nRecipes = response.data.totalRows;
        
        //Promise to get the ingredients of each recipe
        kitchenFactory.getRecipesIng().then(function(resp){
            var recipesRecipeID;
            
        /* CREATE A RECIPE LIST (recipes) WITH THE NEEDED INFO */    
            for (var i = 0; i < nRecipes; i++){
                //Get the ingredients of each recipe
                var recipeIngList = [];
                var ingredient;
                var rec_ingRecipeID; //recipeID of the current row of the database table recipes_ingredients
                recipesRecipeID = response.data.data[i].id;
                
                for (var j = 0; j < resp.data.totalRows; j++){
                    ingredient = resp.data.data[j].__metadata.descriptives.ingredient.label;
                    rec_ingRecipeID = resp.data.data[j].__metadata.descriptives.recipe.value;
                    
                    if( rec_ingRecipeID == recipesRecipeID && !_.contains(recipeIngList, ingredient)){
                        recipeIngList.push( ingredient );
                    }
                }
                
                recipes.push({ id: response.data.data[i].id,
                                name: response.data.data[i].name,
                                description: response.data.data[i].description,
                                category: response.data.data[i].category,
                                level: response.data.data[i].level,
                                totalTime: response.data.data[i].totalTime,
                                image: response.data.data[i].image,
                                ingredients: recipeIngList
                              });
            }
            
            $scope.recipesK = recipes;
            
            //Promise to get the full list of ingredients
            kitchenFactory.allIngredients().then(function(respIng){
                var numIngredients = respIng.totalRows;
                
                // Create the checklist of ingredients in order to know which ones are selected (checked)
                for (var i = 0; i < numIngredients; i++){
                    $scope.ingredients.push({ name: respIng.data[i].name,
                                             checked: false,
                                             id: respIng.data[i].id});
                }
                
                //Save the values of the check boxes
                checkIng = _.pluck($scope.ingredients, 'checked');

        /* HERE IS THE KITCHEN FILTER BY INGREDIENTS */
                /* It saves on recipesK the recipes that you can make with the selected ingredients */
                $scope.searchButton = function (){
                    $scope.recipesK = [];
                    // Update the list of selected ingredients
                    var nameCheckIng = [];
                    nCheckIng = 0; //How many ingredients are selected
                    
                    for(var i=0; i < numIngredients; i++){
                        checkIng[i] = $scope.ingredients[i].checked;

                        if(checkIng[i])
                            nameCheckIng.push($scope.ingredients[i].name);
                    }
                    
                    nCheckIng = nameCheckIng.length;

                    if(nCheckIng == 0) //Any ingredient selected, show all recipes
                        $scope.recipesK = recipes;
                    else{
                        //Foreach recipe, see if it can be made
                        for(var i=0; i < nRecipes; i++){
                            var nRecipeIngredients = recipes[i].ingredients.length;
                            
                            if( nCheckIng >= nRecipeIngredients ){
                                var j = 0;
                                var recipeOK = true;
                                var recipeIngs = recipes[i].ingredients;
                                
                                while( j < nRecipeIngredients && recipeOK ){
                                    if(!_.contains(nameCheckIng, recipeIngs[j]))
                                        recipeOK = false;
                                    j++;  
                                }
                                
                                //If the all recipe ingredients are checked
                                if(recipeOK)
                                    $scope.recipesK.push(recipes[i]);
                            }
                        }
                    }

                    $scope.closeModal();
                };

                $scope.cancelButton = function (){
                    for(var i=0; i < numIngredients; i++){
                        $scope.ingredients[i].checked = checkIng[i];
                    }

                    $scope.closeModal();
                };
            });
        });
    });

    $ionicModal.fromTemplateUrl('filterIng.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
  
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
})