/*
 *
 *
 *
 * MIT Licensed
 *
 */

var app = angular.module('IdeaBoard',['akoenig.deckgrid','btford.modal','ngSanitize','ngRoute']);

app.factory('myModal', function (btfModal) {
  return btfModal({
    controller: 'MyModalCtrl',
    controllerAs: 'modal',
    templateUrl: 'ideamodal.html'
  });
});

app.factory('myModalBoard', function (btfModal) {
  return btfModal({
    controller: 'MyModalBoardCtrl',
    controllerAs: 'modal',
    templateUrl: 'ideaboardmodal.html'
  });
});

app.factory('IdeasFactory',function($http,$filter,$q){
    var factory = {};
    var ideaScope = {};
    factory.getScope = function(){
      return ideaScope;
    };
    factory.setScope = function(scope){
      ideaScope = scope;
    };
    factory.getAllIdeas = function(hackathon){
        var promise = $http.get("/api/"+hackathon)
            .then(function(response){
                return response.data;
            });

        return promise;
    };

    factory.postIdea = function(data){
        var promise = $http.post('/idea', data);
        return promise;
    };
    return factory;
});

app.factory('IdeaBoardFactory',function($http,$filter,$q){
    var factory = {};
    var ideaBoardScope = {};

    factory.getScope = function(){
      return ideaBoardScope;
    };
    factory.setScope = function(scope){
      ideaBoardScope = scope;
    };
    factory.getAllIdeaBoards = function(){
        var promise = $http.get("/ideaboard")
            .then(function(response){
                return response.data;
            });

        return promise;
    };

    factory.postIdeaBoard = function(data){
        var promise = $http.post('/ideaboard', data);
        return promise;
    };
    return factory;
});

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/:param',{
            templateUrl: '/views/board.html',
            controller: 'HomeControllerBoard'
        })
        .when('/',{
            templateUrl: '/views/boardhub.html',
            controller: 'HomeController'
        })
        .otherwise({redirectTo: '/'});
    // $locationProvider.html5Mode( true);
}]);

// typically you'll inject the modal service into its own
// controller so that the modal can close itself
app.controller('MyModalCtrl', function ($scope,IdeasFactory,myModal,$location) {
  $scope.addIdea = function(){
    IdeasFactory.postIdea({
        title: $scope.title,
        description: $scope.description,
        user_id: $scope.user_id,
        email: $scope.email,
        ideaboardName: decodeURI($location.url().split('\/')[1])
    }).success(function(d){
      IdeasFactory.getScope().FetchAllIdeas($location.url().split('\/')[1]);
      $scope.closeMe();
      // $scope.toggle();
    }).error(function(d){
      $scope.error = d.fail;
    });

  };

  $scope.closeMe = myModal.deactivate;

  $scope.error = false;

});

app.controller('MyModalBoardCtrl', function ($scope,IdeaBoardFactory,myModalBoard) {
  $scope.addIdeaBoard = function(){
    IdeaBoardFactory.postIdeaBoard({
        ideaboardName: $scope.ideaboardName,
        description: $scope.description,
        website: $scope.website
    }).success(function(d){
      IdeaBoardFactory.getScope().FetchAllIdeaBoards();
      $scope.closeMe();
      // $scope.toggle();
    }).error(function(d){
      $scope.error = d.fail;
    });

  };

  $scope.closeMe = myModalBoard.deactivate;

  $scope.error = false;

});

app.controller('HomeController', [

    '$scope','$http','IdeasFactory','myModal', '$location',

    function initialize ($scope,$http,IdeasFactory,myModal,$location) {

        'use strict';

        $scope.ideas = [];
        // $scope.ideaboards = [];
        IdeasFactory.setScope($scope);
        // IdeaBoardFactory.setScope($scope);

        $scope.FetchAllIdeas = function(){
            IdeasFactory.getAllIdeas($location.url().split('\/')[1]).then(function(d){

                if(!d){
                    return;
                }else{
                    $scope.ideas = d;
                }

            });
        };

        // $scope.FetchAllIdeaBoards = function(){
        //     IdeaBoardFactory.getAllIdeaBoards().then(function(d){

        //         if(!d){
        //             return;
        //         }else{
        //             $scope.ideaboards = d;
        //         }

        //     });
        // };

        $scope.FetchAllIdeas();
        $scope.boardName = decodeURI($location.url().split('\/')[1]);
        $scope.toggle = myModal.activate;

    }

]);

app.controller('HomeControllerBoard', [

    '$scope','$http','IdeaBoardFactory','myModalBoard',

    function initialize ($scope,$http,IdeaBoardFactory,myModalBoard) {

        'use strict';

        $scope.ideaboards = [];
        IdeaBoardFactory.setScope($scope);
    
        $scope.FetchAllIdeaBoards = function(){

            IdeaBoardFactory.getAllIdeaBoards().then(function(d){

                if(!d){
                    return;
                }else{
                    $scope.ideaboards = d;//d.map(function(element) { return element.getAttribute('name'); });

                }

            });
        };

        $scope.FetchAllIdeaBoards();
        $scope.toggle = myModalBoard.activate;
    }

]);