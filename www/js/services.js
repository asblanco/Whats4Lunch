angular
  .module('w4l.services', [])
  
  .service('RecipesModel', function ($http, Backand) {
      var service = this,
          baseUrl = '/1/objects/',
          objectName = 'recipe/';

      function getUrl() {
          return Backand.getApiUrl() + baseUrl + objectName;
      }

      service.all = function () {
          return $http.get(getUrl());
      };

      service.fetch = function (recipeId) {
          return $http ({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/recipe',
            params: {
              pageSize: 20,
              pageNumber: 1,
              filter: [
                {
                  fieldName: 'id',
                  operator: 'equals',
                  value: recipeId
                }
              ]
            }
          });
      };
  })

  .service('Recipes_IngredientsModel', function ($http, Backand) {
      var service = this,
          baseUrl = '/1/objects/',
          objectName = 'recipes_ingredients/';

      function getUrl() {
          return Backand.getApiUrl() + baseUrl + objectName;
      }

      function getUrlForId(id) {
          return getUrl() + id;
      }
  
      service.all = function () {
          return $http.get(getUrl());
      };

      service.fetch = function (id) {
          return $http.get(getUrlForId(id));
      };
  
      //Return the ingredients of the recipeId
      service.fetchIngredients = function (recipeId) {
          return $http ({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/recipes_ingredients',
            params: {
              pageSize: 20,
              pageNumber: 1,
              filter: [
                {
                  fieldName: 'recipe',
                  operator: 'in',
                  value: recipeId
                }
              ],
              sort: ''
            }
          });
      };
  
      //Return the recipes of the ingredientId
      service.fetchRecipes = function (ingredientId) {
          return $http ({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/recipes_ingredients',
            params: {
              pageSize: 20,
              pageNumber: 1,
              filter: [
                {
                  fieldName: 'ingredient',
                  operator: 'in',
                  value: ingredientId
                }
              ],
              sort: ''
            }
          });
      };
  })

  .service('IngredientsModel', function ($http, Backand) {
      var service = this,
          baseUrl = '/1/objects/',
          objectName = 'ingredient/';

      function getUrl() {
          return Backand.getApiUrl() + baseUrl + objectName;
      }

      function getUrlForId(id) {
          return getUrl() + id;
      }

      service.all = function () {
          return $http.get(getUrl());
      };

      service.fetch = function (id) {
          return $http.get(getUrlForId(id));
      };
  })

  .service('InstructionsModel', function ($http, Backand) {
      var service = this,
          baseUrl = '/1/objects/',
          objectName = 'instructions/';

      function getUrl() {
          return Backand.getApiUrl() + baseUrl + objectName;
      }

      function getUrlForId(id) {
          return getUrl() + id;
      }

      service.all = function () {
          return $http.get(getUrl());
      };

      service.fetch = function (id) {
          return $http.get(getUrlForId(id));
      };
  
      service.fetchInstructions = function (recipeId) {
          return $http ({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/instructions',
            params: {
              pageSize: 20,
              pageNumber: 1,
              filter: [
                {
                  fieldName: 'recipe',
                  operator: 'in',
                  value: recipeId
                }
              ],
              sort: '[{fieldName:\'id\', order:\'asc\'}]'
            }
          });
      };
  })

  .service('LevelsModel', function ($http, Backand) {
      var service = this,
          baseUrl = '/1/objects/',
          objectName = 'level/';

      function getUrl() {
          return Backand.getApiUrl() + baseUrl + objectName;
      }

      function getUrlForId(id) {
          return getUrl() + id;
      }

      service.all = function () {
          return $http.get(getUrl());
      };

      service.fetch = function (id) {
          return $http.get(getUrlForId(id));
      };
  })

  .service('CategoriesModel', function ($http, Backand) {
      var service = this,
          baseUrl = '/1/objects/',
          objectName = 'category/';

      function getUrl() {
          return Backand.getApiUrl() + baseUrl + objectName;
      }

      function getUrlForId(id) {
          return getUrl() + id;
      }

      service.all = function () {
          return $http.get(getUrl());
      };

      service.fetch = function (id) {
          return $http.get(getUrlForId(id));
      };
  });