/*
 *
 *
 *
 * MIT Licensed
 *
 */

var app = angular.module('IdeaBoard',['akoenig.deckgrid','btford.modal','ngSanitize']);

app.factory('myModal', function (btfModal) {
  return btfModal({
    controller: 'MyModalCtrl',
    controllerAs: 'modal',
    templateUrl: 'modal.html'
  });
});

QuoteBase.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
        .when('/:boardname',{
            controller: 'HomeController',
            templateUrl: 'views/public.html'
        })
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}]);

// typically you'll inject the modal service into its own
// controller so that the modal can close itself
app.controller('MyModalCtrl', function ($scope,IdeasFactory,myModal) {
  $scope.addIdea = function(){
    IdeasFactory.postIdea({
        title: $scope.title,
        description: $scope.description,
        user_id: $scope.user_id,
        email: $scope.email
    }).success(function(d){
      IdeasFactory.getScope().FetchAllIdeas();
      $scope.closeMe();
    }).error(function(d){
      $scope.error = d.fail;
    });

  };
  $scope.closeMe = myModal.deactivate;

  $scope.error = false;

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
    factory.getAllIdeas = function(){
        var promise = $http.get("/idea")
            .then(function(response){
                console.log(response);
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

app.controller('HomeController', [

    '$scope','$http','IdeasFactory','myModal',

    function initialize ($scope,$http,IdeasFactory,myModal) {

        'use strict';

        $scope.ideas = [];
        IdeasFactory.setScope($scope);
        $scope.FetchAllIdeas = function(){
            IdeasFactory.getAllIdeas().then(function(d){
                if(!d){
                    return;
                }else{
                    $scope.ideas = d;
                }
            });
        };

        $scope.FetchAllIdeas();
        $scope.toggle = myModal.activate;




    }

]);
