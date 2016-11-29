/**
 * Created by Thomas on 5/28/2015.
 */
var app = angular.module('refereeCareerApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeController"
        })
        .when("/addGame", {
            templateUrl: "views/add-game.html",
            controller: "GamesController"
        })
        .when("/addGame/edit/:id", {
            templateUrl: "views/add-game.html",
            controller: "GamesController"
        })
        .when("/viewAllGames", {
            templateUrl: "views/all-games.html",
            controller: "HomeController"
        })
        .when("/viewGameDetails/:id", {
            templateUrl: "views/game-details.html",
            controller: "GamesController"
        })
        .otherwise({
            redirectTo: "/"
        })
});

 app.filter('round', function () {
        return function (value) {
            return Math.round(value);
        };
    })


app.service("GameRetrievalService", function($http) {

    var gameRetrievalService = {};

    gameRetrievalService.games = [];

    $http.get("data/referee-career.json")
        .success(function(data) {
            gameRetrievalService.games = data.GAMES;
        
            gameRetrievalService.games.sumYellows = getSumYellows();
            gameRetrievalService.games.sumReds = getSumCards();
            
            function getSumYellows() {
                var sumYellows=0;
        for (var game in gameRetrievalService.games) {

            var yellows = parseInt(gameRetrievalService.games[game].yellows);

            if (gameRetrievalService.games[game].yellows !== "" && yellows > 0) {
                sumYellows += yellows;
            }
        }
        return sumYellows;
    };
    
                function getSumCards() {
                var sum=0;
        for (var game in gameRetrievalService.games) {
	        
	        var x = parseInt(gameRetrievalService.games[game].reds);

            if (gameRetrievalService.games[game].reds !== "" && x>0) {
                sum += x;
            }
        }
        return sum;
    };

        })
        .error(function(data, status) {
            alert("Something went wrong.")
        });





    gameRetrievalService.findById = function(id) {
        for (var game in gameRetrievalService.games) {
            if (gameRetrievalService.games[game].Match_Id == id) {
                return gameRetrievalService.games[game];
            }
        }
    };

    gameRetrievalService.getNewId = function() {
        if (gameRetrievalService.newId) {
            gameRetrievalService.newId++;
            return gameRetrievalService.newId;
        } else {
            var maxId = _.max(gameRetrievalService.games, function(entry) {

                return entry.id;
            })
            gameRetrievalService.newId = maxId.id + 1;
            return gameRetrievalService.newId;
        }
    };

    gameRetrievalService.save = function(entry) {
        var updatedItem = gameRetrievalService.findById(entry.id);
        if (updatedItem) {

            $http.post("data/updated_item.json", entry)
                .success(function(data) {
                    if (data.status === 1) {
                        updatedItem.completed = entry.completed;
                        updatedItem.itemName = entry.itemName;
                        updatedItem.date = entry.date;
                    }
                })
                .error(function(data, status) {})


        } else {
            $http.post("data/added_item.json", entry)
                .success(function(data) {
                    entry.id = data.id;
                })
                .error(function(data, status) {})
            gameRetrievalService.games.push(entry);
        }
    };

    gameRetrievalService.removeGame = function(entry) {

        $http.post("data/delete_item.json", {
                id: entry.id
            })
            .success(function(data) {
                if (data.status === 1) {
                    var index = gameRetrievalService.games.indexOf(entry);
                    gameRetrievalService.games.splice(index, 1);
                }
            })
            .error(function(data, status) {

            })


    };

    gameRetrievalService.markCompleted = function(entry) {
        entry.completed = !entry.completed;
    };

    //always remember to return a service
    return gameRetrievalService;
});


app.controller("HomeController", ["$scope", "GameRetrievalService", function($scope, GameRetrievalService) {
    $scope.games = GameRetrievalService.games;

    $scope.removeGame = function(entry) {
        GameRetrievalService.removeGame(entry);
    }

    $scope.markCompleted = function(entry) {
        GameRetrievalService.markCompleted(entry);
    }

    $scope.$watch(function() {
            return GameRetrievalService.games
        },
        function(games) {
            $scope.games = games;
        })

    //$scope.sumYellows = GameRetrievalService.sumYellows();

}]);

app.controller("GamesController", ["$scope", "$routeParams", "GameRetrievalService", "$location", function($scope, $routeParams, GameRetrievalService, $location) {

    if (!$routeParams.id) {
        $scope.game = {
            id: 0,
            completed: false,
            itemName: '',
            date: new Date()
        };
    } else {
        $scope.game = _.clone(GameRetrievalService.findById(parseInt($routeParams.id)));
    }

    $scope.save = function() {
        GameRetrievalService.save($scope.game);
        location.pathname("/");
    }

    console.log($scope.game);

}]);


app.directive("kcGameItem", function() {
    return {
        restrict: "E",
        templateUrl: "views/game-item.html"
    }
});