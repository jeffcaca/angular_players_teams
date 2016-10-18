   var myAppModule = angular.module('myApp', ['ngRoute']);
   myAppModule.config(function ($routeProvider){
    $routeProvider
      .when('/', {templateUrl: "partials/players.html"})
      .when('/teams', {templateUrl: "partials/teams.html"})
      .when('/associations', {templateUrl: "partials/associations.html"})
      .otherwise({redirectTo: '/'});
   });

    myAppModule.factory('playerFactory', function (){
    // The factory is nothing more than a function that returns an object
    var players = [
        {name: 'Jeff', team:""},
        {name: "Dave", team: ""},
        ];
    var factory = {};
    factory.addPlayer = function(player){
      player.team ="";
      players.push(player)


    }
    factory.delete = function(id, callback){
      players.splice(id, 1)
    }

    factory.getPlayers = function (callback){
        callback(players);
    }
    factory.addPlayerToTeam = function(data){
    
      players[data.player].team = data.team;
    }
    factory.removePlayerFromTeam = function($index){
      console.log(players[$index].team)
      players[$index].team = "";
    }
  
    return factory;
});
  myAppModule.factory('teamFactory', function (){
    // The factory is nothing more than a function that returns an object
    var teams = [
        {name: 'Seahawks'},
        {name: "49ers"},
        ];
    var factory = {};
    factory.addTeam = function(team){
      teams.push(team)

    }
    factory.delete = function(id, callback){
      teams.splice(id, 1)
    }

    factory.getTeams = function (callback){
        callback(teams);
    }
  
    return factory;
});



    myAppModule.controller('playersController', ['$scope', 'playerFactory', function ($scope, playerFactory){

       

        playerFactory.getPlayers(function (data){
            $scope.players = data;
            $scope.player ={}

        })

        $scope.addPlayer = function(){
           playerFactory.addPlayer($scope.player)
            $scope.player = {};

        }
        $scope.delete = function(id){
           playerFactory.delete(id)
        }
    }])

        myAppModule.controller('teamsController', ['$scope', 'teamFactory', function ($scope, teamFactory){

       

        teamFactory.getTeams(function (data){
            $scope.teams = data;
            $scope.team ={}

        })

        $scope.addTeam = function(){
           teamFactory.addTeam($scope.team)
            $scope.team = {};

        }
        $scope.delete = function(id){
           teamFactory.delete(id)
        }
    }])



    myAppModule.controller('associationsController', ['$scope', 'teamFactory', 'playerFactory', function ($scope, teamFactory, playerFactory){

      $scope.players = [];
      $scope.teams = [];

      playerFactory.getPlayers(function (data){
          $scope.players = data;
          $scope.player = {}
      })
      teamFactory.getTeams(function (data){
          $scope.teams = data;
          $scope.team = {}
      })
      $scope.addPlayerToTeam = function(){
        playerFactory.addPlayerToTeam($scope.newAssociation);
      }
      $scope.removePlayerFromTeam = function($index){
        playerFactory.removePlayerFromTeam($index)
      }
    }])