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




