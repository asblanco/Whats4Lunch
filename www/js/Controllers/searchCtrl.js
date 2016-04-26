angular
.module('w4l.controllers')

//Search controller: modal page, checkboxes and filters
.controller('searchCtrl', function($scope, $ionicModal, searchFactory, appFactory) {
    
    $scope.recipesS = []; //Recipes that shows on the view
    $scope.categories = [];
    $scope.levels = [];
    var recipes = []; //All the recipes
    var nRecipes; //Number of recipes
    var checkCat = []; //Save check categories
    var checkLevel = []; //Save check levels
    var checkTime = []; //Save check time
    
    //Checkbox of the modal page
    $scope.time = [
        { text: "< 20 minutes", checked: false },
        { text: "20-45 minutes", checked: false },
        { text: "> 45 minutes", checked: false }
    ];
    //Save the values of the check boxes
    var checksTime = _.pluck($scope.checkListTime, 'checked');
    
    //Promise to get the list of recipes
    appFactory.allRecipes().then(function(response){
        nRecipes = response.data.totalRows;
        
        for (var i = 0; i < nRecipes; i++){
            recipes.push({ id: response.data.data[i].id,
                            name: response.data.data[i].name,
                            description: response.data.data[i].description,
                            category: response.data.data[i].category,
                            level: response.data.data[i].level,
                            totalTime: response.data.data[i].totalTime,
                            image: response.data.data[i].image
                         });
        }
        
        $scope.recipesS = recipes;
        
        //Promise to get the categories
        searchFactory.allCategories().then(function(catResp){
            var nCat = catResp.data.totalRows;

            for( var i=0; i < nCat; i++){
                $scope.categories.push({ id: catResp.data.data[i].id,
                                         name: catResp.data.data[i].name,
                                         checked: false });
            }
            //Save the values of the check boxes
            var checksCat = _.pluck($scope.categories, 'checked');
            
            //Promise to get the difficulty levels
            searchFactory.allLevels().then(function(levelResp){
                var nLevels = levelResp.data.totalRows;

                for( var i=0; i < nLevels; i++){
                    $scope.levels.push({ id: levelResp.data.data[i].id,
                                         name: levelResp.data.data[i].name,
                                         checked: false });
                }
                //Save the values of the check boxes
                var checksLevel = _.pluck($scope.levels, 'checked');
                
                $scope.searchButton = function (){

                //--- Category filter ---
                    var countChecksCat = 0; //Increases +1 in each filter it enters
                    checksCat = _.pluck($scope.categories, 'checked'); //Save the checkboxes
                    $scope.recipesS = [];

                    //Make the filters with all the recipes (recipes) making the union in recipesS
                    var categID = _.pluck($scope.categories, 'id');

                    for (var i=0; i < nCat; i++){
                        if(checksCat[i]){
                            $scope.recipesS = _.union($scope.recipesS, _.where(recipes, {category: categID[i].toString()}));
                            countChecksCat++;
                        }
                    }

                    //If all the checkboxes are in false, it means that all the recipes must be shown
                    if(countChecksCat == 0){
                        $scope.recipesS = recipes;
                    }


                //--- Level filter ---
                    var countLevel = 0; //Know if it enters in some level filter
                    checksLevel = _.pluck($scope.levels, 'checked');
                    var recipesSCopy = $scope.recipesS;
                    $scope.recipesS = [];

                    //Make the union of the filters that are in true
                    var levelID = _.pluck($scope.levels, 'id');
                    for(var i = 0; i < nLevels; i++){
                        if(checksLevel[i] == true){
                            $scope.recipesS = _.union($scope.recipesS, _.where(recipesSCopy, {level: levelID[i].toString()}));
                            countLevel++;
                        }
                    }

                    //If non filter is selected, leave it with the category filter list
                    if(countLevel == 0)
                        $scope.recipesS = recipesSCopy;


                //--- Time filter ---
                    //Array with only the times of the recipes
                    var recipesTime = _.pluck($scope.recipesS, 'totalTime');
                    checksTime = _.pluck($scope.time, 'checked');
                    //Separate the recipes into 3 groups, less than 20, than 45 or more than 45
                    var i = 0;
                    var long = recipesTime.length;
                    var list20 = [];
                    var list45 = [];
                    var listOthers = [];
                    for (i = 0; i< long; i++){
                        if(recipesTime[i] > 45){
                            listOthers.push($scope.recipesS[i]);
                        }else if(recipesTime[i] <= 20){
                            list20.push($scope.recipesS[i]);
                        }else{
                            list45.push($scope.recipesS[i]);
                        }
                    }

                    var countTime = 0; //Increases in 1 in each filter it enters
                    var recipesSTime = $scope.recipesS;
                    $scope.recipesS = [];
                    //Check if 20 or 45 are clicked
                    if($scope.time[0].checked == true){
                        $scope.recipesS = _.union($scope.recipesS, list20);
                        countTime++;
                    }
                    if($scope.time[1].checked == true){
                        $scope.recipesS = _.union($scope.recipesS, list45);
                        countTime++;
                    }
                    if($scope.time[2].checked){
                        $scope.recipesS = _.union($scope.recipesS, listOthers);
                        countTime++;
                    }

                    //If none time filter is selected, save it without time filter
                    if(countTime == 0)
                        $scope.recipesS = recipesSTime;
                    
                    $scope.closeModal();
                };
                
                $scope.cancelButton = function (){
                    //Put the check boxes as the last saved filter
                    var i = 0;
                    //Restore check values of category
                    for (i = 0; i < nCat; i++) {
                        $scope.categories[i].checked = checksCat[i];
                    }
                    //Restore check values of difficulty
                    for (i = 0; i < nLevels; i++) {
                        $scope.levels[i].checked = checksLevel[i];
                    }
                    //Restore check values of time
                    var long = $scope.time.length;
                    for (i = 0; i < long; i++) {
                        $scope.time[i].checked = checksTime[i];
                    }

                    $scope.closeModal();
                };
            });
        });
    });
    
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
})