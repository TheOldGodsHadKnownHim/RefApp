app.service("GameRetrievalService", function($http) {

    var gameRetrievalService = {};

    gameRetrievalService.games = [];

    $http.get("data/referee-career.json")
        .success(function(data) {
            gameRetrievalService.games = data.GAMES;        
            gameRetrievalService.games.sumYellows = getSumYellows();
            gameRetrievalService.games.sumReds = getSumCards();
            gameRetrievalService.games.maxReds = getMaxReds();
            gameRetrievalService.games.maxYellows = getMaxYellows();

            
            function getSumYellows() {
                var sumYellows=0;
        for (var game in gameRetrievalService.games) {

            gameRetrievalService.games.sumYellows = getGameStatisticSum('yellows');
            gameRetrievalService.games.sumReds = getGameStatisticSum('reds');
            gameRetrievalService.games.maxReds = getMaxReds();
            gameRetrievalService.games.maxYellows = getMaxYellows();
            gameRetrievalService.games.sumGoals = getGameStatisticSum('goals');
            gameRetrievalService.games.maxGoalsInGame = getMaxGoalsInGame();


            if (gameRetrievalService.games[game].reds !== "" && x>0) {
                sum += x;
            }
        }
        return sum;
    };
    
                    function getMaxReds() {
                var max=0;
        for (var game in gameRetrievalService.games) {
	        
	        var x = parseInt(gameRetrievalService.games[game].reds);

            if (gameRetrievalService.games[game].reds !== "" && x>0 && x > max) {
                max = x;
            }
        }
        return max;
    };
    
                        function getMaxYellows() {
                var max=0;
        for (var game in gameRetrievalService.games) {
	        
	        var x = parseInt(gameRetrievalService.games[game].yellows);

            if (gameRetrievalService.games[game].yellows !== "" && x>0 && x > max) {
                max = x;
            }
        }
        return max;
    };

            function getGameStatisticSum(valueToBeSummed) {
                var sum = 0;

                if (valueToBeSummed === 'reds') {
                    for (var game in gameRetrievalService.games) {


                        var x = parseInt(gameRetrievalService.games[game].reds);

                        if (gameRetrievalService.games[game].reds !== "" && x > 0) {
                            sum += x;
                        }
                    }
                } else if (valueToBeSummed === 'yellows') {
                    for (var game in gameRetrievalService.games) {
                        var x = parseInt(gameRetrievalService.games[game].yellows);

                        if (gameRetrievalService.games[game].yellows !== "" && x > 0) {
                            sum += x;
                        }
                    }
                } else if (valueToBeSummed === 'goals') {
                    for (var game in gameRetrievalService.games) {

                        var x = parseInt(gameRetrievalService.games[game].Home_Score) +
                            parseInt(gameRetrievalService.games[game].Away_Score);

                        if (gameRetrievalService.games[game].Home_Score !== "" && gameRetrievalService.games[game].Away_Score !== "" && x > 0) {
                            sum += x;
                        }
                    }
                }
                return sum;
            };

            function getMaxReds() {
                var max = 0;
                for (var game in gameRetrievalService.games) {

                    var x = parseInt(gameRetrievalService.games[game].reds);

                    if (gameRetrievalService.games[game].reds !== "" && x > 0 && x > max) {
                        max = x;
                    }
                }
                return max;
            };

            function getMaxYellows() {
                var max = 0;
                for (var game in gameRetrievalService.games) {

                    var x = parseInt(gameRetrievalService.games[game].yellows);

                    if (gameRetrievalService.games[game].yellows !== "" && x > 0 && x > max) {
                        max = x;
                    }
                }
                return max;
            };

            function getMaxGoalsInGame() {
                var max = 0;
                for (var game in gameRetrievalService.games) {

                    var x = parseInt(gameRetrievalService.games[game].Home_Score) +
                        parseInt(gameRetrievalService.games[game].Away_Score);

                    if (gameRetrievalService.games[game].Home_Score !== "" && gameRetrievalService.games[game].Away_Score !== "" && x > 0 && x > max) {
                        max = x;
                    }
                }
                return max;
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