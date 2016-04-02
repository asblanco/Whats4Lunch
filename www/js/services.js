angular
  .module('w4l.services', [])

  .service('ItemsModel', function ($http, Backand) {
      var service = this,
          baseUrl = '/1/objects/',
          objectName = 'recipe/';

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