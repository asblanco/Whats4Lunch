angular
.module('w4l.factories')

.factory('kitchenFactory', function($http, Backand) {
    var baseUrl = '/1/objects/',
        recipesbyIng,
        ingredients,
        recipe;
    
    function getUrl(objectName) {
        return Backand.getApiUrl() + baseUrl + objectName;
    }

    // ingredients is a promise of array of ingredients        
    function allIngredients(){
        return $http ({
            method: 'GET',
            url: getUrl('ingredient'),
            params: {
                pageSize: 50,
                pageNumber: 1,
                sort: '[{fieldName:\'name\', order:\'asc\'}]'
            }
        })
        // then allows transforming the promise of http response into a promise of something else
        .then(function(response) {
            // transforms the http response into an array of ingredients
            return response.data;
        });
    };
    
    //Return recipes that contains ingredientId
    function getRecByIng(ingredientId) {
          return $http ({
            method: 'GET',
            url: getUrl('recipes_ingredients'),
            params: {
              filter: [
                {
                  fieldName: 'ingredient',
                  operator: 'in',
                  value: ingredientId
                }
              ]
            }
          }).then(function(response) {
            // transforms the http response into an array of recipes
            return response.data;
        });
      };
    
    //Return the table recipes_ingredients
    function getRecipesIng() {
        return $http ({
            method: 'GET',
            url: getUrl('recipes_ingredients'),
            params: {
                pageSize: 100,
                pageNumber: 1
            }
        }).then(function(response) {
            return response;
        }); 
    };
    
    function getRecipe(id) {
          return $http ({
            method: 'GET',
            url: getUrl('recipe/'),
            params: {
              filter: [
                {
                  fieldName: 'id',
                  operator: 'equals',
                  value: id
                }
              ]
            }
          }).then(function(response) {
            return response.data.data[0];
        });
      };
        
    return {
        allIngredients: function(){
            ingredients = allIngredients();
            return ingredients;
        },
        getRecipesByIng: function(recipeId){
            recipesbyIng = getRecByIng(recipeId);
            return recipesbyIng;
        },
        getRecipe: function(recipeId){
            recipe = getRecipe(recipeId);
            return recipe;
        },
        getRecipesIng: function(){
            return getRecipesIng();
        }
    };
});