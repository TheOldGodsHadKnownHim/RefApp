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