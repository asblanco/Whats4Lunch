angular
.module('w4l.factories')

.factory('kitchenFactory', function($http, Backand) {
    var baseUrl = '/1/objects/',
        tempData = {content:null};
    
    function getUrl(objectName) {
        return Backand.getApiUrl() + baseUrl + objectName;
    }
    
    function allIng() {
        return $http.get(getUrl('ingredient/'));
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
          });
      };
        
    return {
        allIngredients: function(){
            allIng().success(function(data) {
                tempData.content = data.data;
            }); 
            return tempData;
        },
        getRecipesByIng: function(recipeId){
            getRecByIng(recipeId).success(function(data) {
                tempData.content = data.data;
            }); 
            return tempData;
        }
    };
});