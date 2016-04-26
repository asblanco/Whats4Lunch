angular
.module('w4l.factories')

.factory('searchFactory', function($http, Backand) {
    var baseUrl = '/1/objects/',
        categories,
        levels;
    
    function getUrl(objectName) {
        return Backand.getApiUrl() + baseUrl + objectName;
    }
    
    function allCategories() {
          return $http.get(getUrl('category/'))
                .then(function(response) {
                    return response;
                });
    };
    
    function allLevels() {
          return $http.get(getUrl('level/'))
                .then(function(response) {
                    return response;
                });
    };
        
    return {
        allCategories: function(){
            categories = allCategories();
            return categories;
        },
        allLevels: function(){
            levels = allLevels();
            return levels;
        }
    };
});