angular
.module('w4l.factories')

.factory('searchFactory', function($http, Backand) {
    var baseUrl = '/1/objects/',
        categories = {content:null, size:null},
        levels = {content:null, size:null};
    
    function getUrl(objectName) {
        return Backand.getApiUrl() + baseUrl + objectName;
    }
    
    function allCategories() {
          return $http.get(getUrl('category/'));
    };
    
    function allLevels() {
          return $http.get(getUrl('level/'));
    };
        
    return {
        allCategories: function(){
            allCategories().success(function(data) {
                categories.content = data.data;
                categories.size = data.data.totalRows;
            }); 
            return categories;
        },
        allLevels: function(){
            allLevels().success(function(data) {
                levels.content = data.data;
                levels.size = data.data.totalRows;
            }); 
            return levels;
        }
    };
});