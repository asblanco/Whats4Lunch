angular.module('starter.filters', [])

.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
})

.filter('recipeSearchFilter', [function () {
    return function(recipeList){
        var i = 0, toRet;
        var long = recipeList.length;
        for (i = 0; i < long; i++) { 
            if (i == $scope.recipeList[i].id)
                $scope.toRet = $scope.recipeList[i].title;
          }  
        return $scope.toRet;
    };
}]);