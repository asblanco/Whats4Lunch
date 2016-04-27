angular
.module('w4l.factories', [])

.factory('appFactory', function($http, Backand) {
    var baseUrl = '/1/objects/',
        recipes,
        recipeDetails = {details:null, details2:null},
        ingredients = {content:null},
        instructions = {content:null};
    
    function getUrl(objectName) {
        return Backand.getApiUrl() + baseUrl + objectName;
    }
    
    function allRecipes(){
        return $http.get(getUrl('recipe/')).then(function(response) {
            return response;
        }); 
    };
    
    function nRecipes(){
        return $http.get(getUrl('recipe/')).then(function(response) {
            return response.data.totalRows;
        }); 
    };
    
    function getRecipeDetails(id) {
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
          });
      };
    
    //Return the ingredients of the recipeId
    function getRecipeIng(recipeId) {
          return $http ({
            method: 'GET',
            url: getUrl('recipes_ingredients'),
            params: {
              filter: [
                {
                  fieldName: 'recipe',
                  operator: 'in',
                  value: recipeId
                }
              ]
            }
          });
      };
    
    function getRecipeInstructions(recipeId) {
        return $http ({
            method: 'GET',
            url: getUrl('instructions/'),
            params: {
              filter: [
                {
                  fieldName: 'recipe',
                  operator: 'in',
                  value: recipeId
                }
              ],
              sort: '[{fieldName:\'step\', order:\'asc\'}]'
            }
          });
      };
    
    return {
        allRecipes: function() {
            recipes = allRecipes();
            return recipes;
        },
        numRecipes: function() { //Number of recipes, used to generate a random recipe ID
            return nRecipes();
        },
        getRecipeDetails: function(id){
            getRecipeDetails(id).success(function(data) {
                recipeDetails.details = data.data[0];
                recipeDetails.details2 = data.data[0].__metadata.descriptives;
            }); 
            return recipeDetails;
        },
        getRecipeIngredients: function(recipeId){
            getRecipeIng(recipeId).success(function(data) {
                ingredients.content = data.data;
            }); 
            return ingredients;
        },
        getRecipeInstructions: function(recipeId){
            getRecipeInstructions(recipeId).success(function(data) {
                instructions.content = data.data;
            }); 
            return instructions;
        }
    };
});