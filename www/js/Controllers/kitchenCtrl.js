angular
.module('starter.controllers')

.controller('kitchenCtrl', function($scope, $ionicModal) {
    $scope.recipeListIng = $scope.recipeList;
    $scope.noIngredients = "";
    $scope.ingredients = [];
    
    $scope.buttonSearch = function (){
        $scope.recipeListIng = [];
        var count = 0;
        var i = 0;
        var j = 0;
        var long = $scope.ingredientsCheckList.length;
        var long2 = $scope.recipeList.length;
        for (i = 0; i < long; i++){
            if($scope.ingredientsCheckList[i].checked == true){
                count++;
                $scope.ing = $scope.ingredientsCheckList[i].name;
                for(j = 0; j < long2; j++){
                    if(_.contains($scope.recipeList[j].ing, $scope.ing)){
                        $scope.recipeListIng.push($scope.recipeList[j]);
                    }
                }
            }    
        }
        
        if(count == 0)
            $scope.recipeListIng = $scope.recipeList;
        
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
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    
    //Add the new ingredient to the ingredients list
    $scope.addIng = function(ing){
        $scope.ingredients.push(ing);
    };
})