angular
.module('w4l.controllers')

//Search controller: modal page, checkboxes and filters
.controller('searchCtrl', function($scope, $ionicModal) {
    //recipeListSF is the list shown in the view
    $scope.recipeListSF = $scope.recipeList;
    
    //Checkboxes of the modal page
    $scope.checkListCat = [
        { text: "Pasta", checked: false },
        { text: "Soup", checked: false },
        { text: "Vegetables", checked: false },
        { text: "Meat", checked: false }
    ];
    //Save the values of the check boxes
    $scope.checksCat = _.pluck($scope.checkListCat, 'checked');
    
    $scope.checkListDif = [
        { text: "Low", checked: false },
        { text: "Medium", checked: false },
        { text: "High", checked: false }
    ];
    //Save the values of the check boxes
    $scope.checksDif = _.pluck($scope.checkListDif, 'checked');
    
    $scope.checkListTime = [
        { text: "< 20 minutes", checked: false },
        { text: "20-45 minutes", checked: false }
    ];
    //Save the values of the check boxes
    $scope.checksTime = _.pluck($scope.checkListTime, 'checked');
    
  /* Modal page of Search */
    $ionicModal.fromTemplateUrl('filterSearch.html', {
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
    
/*---- Method to execute Filters ----*/
    $scope.buttonOK = function(){ 
    //--- Category filter ---
        var countChecksCat = 0; //Increases +1 in each filter it enters
        $scope.checksCat = _.pluck($scope.checkListCat, 'checked');
        $scope.recipeListSF = [];
        
        //Make the filters with all the recipes (recipeList) making the union in recipeListSF
        $scope.categories = _.pluck($scope.checkListCat, 'text');
        var i = 0;
        var long = $scope.categories.length;
        for (i=0; i < long; i++){
            if($scope.checksCat[i] == true){
                $scope.recipeListSF = _.union($scope.recipeListSF, _.where($scope.recipeList, {cat: $scope.categories[i]}));
                countChecksCat++;
            }
        }
        
        //If all the checkboxes are in false, it means that all the recipes must be shown
        if(countChecksCat == 0){
            $scope.recipeListSF = $scope.recipeList;
        }
        
        
    //--- Difficulty filter ---
        var countDif = 0; //Know if it enters in some difficulty filter
        $scope.checksDif = _.pluck($scope.checkListDif, 'checked');
        $scope.recipeListSFCopy = $scope.recipeListSF;
        $scope.recipeListSF = [];
        
        //Make the union of the filters that are in true
        $scope.difficulties = _.pluck($scope.checkListDif, 'text');
        var long = $scope.checkListDif.length;
        for(i = 0; i < long; i++){
            if($scope.checksDif[i] == true){
            $scope.recipeListSF = _.union($scope.recipeListSF, _.where($scope.recipeListSFCopy, {dif: $scope.difficulties[i]}));
            countDif++;
            }
        }
        
        //If non filter is selected, leave it with the category filter list
        if(countDif == 0)
            $scope.recipeListSF = $scope.recipeListSFCopy;
        
        
    //--- Time filter ---
        //Array with only the times of the recipes
        $scope.listTime = _.pluck($scope.recipeListSF, 'time');
        $scope.checksTime = _.pluck($scope.checkListTime, 'checked');
        //Separate the recipes into 3 groups, less than 20, than 45 or others
        var i = 0;
        var long = $scope.listTime.length;
        $scope.list20 = [];
        $scope.list45 = [];
        $scope.listOthers = [];
        for (i = 0; i< long; i++){
            if($scope.listTime[i] > 45){
                $scope.listOthers.push($scope.recipeListSF[i]);
            }else if($scope.listTime[i] <= 20){
                $scope.list20.push($scope.recipeListSF[i]);
            }else{
                $scope.list45.push($scope.recipeListSF[i]);
            }
        }
        
        var countTime = 0; //Increases in 1 in each filter it enters
        $scope.recipeListSFTime = $scope.recipeListSF;
        $scope.recipeListSF = [];
        //Check if 20 or 45 are clicked
        if($scope.checkListTime[0].checked == true){
            $scope.recipeListSF = _.union($scope.recipeListSF, $scope.list20);
            countTime++;
        }
        if($scope.checkListTime[1].checked == true){
            $scope.recipeListSF = _.union($scope.recipeListSF, $scope.list45);
            countTime++;
        }
        
        //If none time filter is selected, save it without time filter
        if(countTime == 0)
            $scope.recipeListSF = $scope.recipeListSFTime;
        
        $scope.closeModal(); 
    };
    
    $scope.buttonCancel = function(){
        //Put the check boxes as the last saved filter
        var i = 0;
        //Restore check values of category
        var long = $scope.checkListCat.length;
        for (i = 0; i < long; i++) {
            $scope.checkListCat[i].checked = $scope.checksCat[i];
        }
        //Restore check values of difficulty
        var long = $scope.checkListDif.length;
        for (i = 0; i < long; i++) {
            $scope.checkListDif[i].checked = $scope.checksDif[i];
        }
        //Restore check values of time
        var long = $scope.checkListTime.length;
        for (i = 0; i < long; i++) {
            $scope.checkListTime[i].checked = $scope.checksTime[i];
        }
        
        $scope.closeModal(); 
    };

})