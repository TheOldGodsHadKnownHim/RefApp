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