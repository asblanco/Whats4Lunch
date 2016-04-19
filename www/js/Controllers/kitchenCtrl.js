angular
.module('w4l.controllers')

.controller('kitchenCtrl', function($scope, $ionicModal, kitchenFactory) {
    $scope.recipeListIng = $scope.recipes;
    $scope.noIngredients = "";
    $scope.ingredients = kitchenFactory.allIngredients();
    
    $scope.buttonSearch = function (){
        $scope.recipeListIng = [];
        var count = 0;
        var i = 0;
        var j = 0;
        var long = $scope.ingredientsCheckList.length;
        var long2 = $scope.recipes.length;
        for (i = 0; i < long; i++){
            if($scope.ingredientsCheckList[i].checked == true){
                count++;
                $scope.ing = $scope.ingredientsCheckList[i].name;
                for(j = 0; j < long2; j++){
                    if(_.contains($scope.recipes[j].ing, $scope.ing)){
                        $scope.recipeListIng.push($scope.recipes[j]);
                    }
                }
            }
        }
        
        if(count == 0)
            $scope.recipeListIng = $scope.recipes;
        
        $scope.closeModal();
    };
    
    
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
    
    //Add the new ingredient to the ingredients list
    $scope.addIng = function(ing){
        $scope.ingredients.push(ing);
    };
})