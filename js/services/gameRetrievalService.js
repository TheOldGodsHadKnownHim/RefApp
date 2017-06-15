app.service("GameRetrievalService", function($http) {

    var gameRetrievalService = {};

    gameRetrievalService.games = [];

    $http.get("data/referee-career.json")
        .success(function(data) {
	        
            gameRetrievalService.games = data.GAMES;
            gameRetrievalService.games.initialiseStatistics = initialiseStats();

            function initialiseStats() {
	            
                    gameRetrievalService.games.sumReds = getGameStatisticSum('reds');
                    gameRetrievalService.games.maxReds = getMaxReds();
                    gameRetrievalService.games.sumYellows = getGameStatisticSum('yellows');
                    gameRetrievalService.games.maxYellows = getMaxYellows();
                    gameRetrievalService.games.sumGoals = getGameStatisticSum('goals');
                    gameRetrievalService.games.maxGoalsInGame = getMaxGoalsInGame();
                    gameRetrievalService.games.sumFrees = getGameStatisticSum('frees');
                    gameRetrievalService.games.gamesWithFrees = getGamesWithFrees();
                    gameRetrievalService.games.sumPens = getGameStatisticSum('pens');
                    gameRetrievalService.games.gamesWithPens = getGamesWithPens();
                    gameRetrievalService.games.sumDistance = getGameStatisticSum('Distance_Covered');
                    gameRetrievalService.games.gamesWithKmsRecorded = getGamesWithKmsRecorded();
                    gameRetrievalService.games.sumOffsides = getGameStatisticSum('Offsides');
                    gameRetrievalService.games.gamesWithOffsidesRecorded = getGamesWithOffsidesRecorded();                    
                gameRetrievalService.games.sumEnjoyment = getGameStatisticSum('enjoy');
                gameRetrievalService.games.sumAssessment = getGameStatisticSum('assess');
                gameRetrievalService.games.gamesWithAssessments = getGamesWithAssessments();
                gameRetrievalService.games.gamesWithEnjoyment = getGamesWithEnjoyment();
                gameRetrievalService.games.sumHours = getGameStatisticSum('hours');
                gameRetrievalService.games.sumEarnings = getGameStatisticSum('Earnings');




                return gameRetrievalService.games;
            };
                    })
        .error(function(data, status) {
            alert("Something went wrong.")
        });

			//function to get the sum of a certain value
            function getGameStatisticSum(valueToBeSummed) {
                	var sum = 0;

                    for (var game in gameRetrievalService.games) {
						
						if (valueToBeSummed === 'reds') {

                        var x = parseInt(gameRetrievalService.games[game].reds);

                        if (gameRetrievalService.games[game].reds !== "" && x > 0) {
                            sum += x;
                        }
                    } else if (valueToBeSummed === 'yellows') {
                        var x = parseInt(gameRetrievalService.games[game].yellows);

                        if (gameRetrievalService.games[game].yellows !== "" && x > 0) {
                            sum += x;
                        } 
                	}  else if (valueToBeSummed === 'goals') {

                        var x = parseInt(gameRetrievalService.games[game].Home_Score) +
                            parseInt(gameRetrievalService.games[game].Away_Score);

                        if (gameRetrievalService.games[game].Home_Score !== "" && gameRetrievalService.games[game].Away_Score !== 						"" && x > 0) {
                            sum += x;
                        } 
                	}  else if (valueToBeSummed === 'frees') {

                        var x = parseInt(gameRetrievalService.games[game].Num_Frees);

                        if (gameRetrievalService.games[game].Num_Frees !== "" && x > 0) {
                            sum += x;
                        }
                }       else if (valueToBeSummed === 'pens') {

                        var x = parseInt(gameRetrievalService.games[game].Num_Pens);

                        if (gameRetrievalService.games[game].Num_Pens !== "" && x > 0) {
                            sum += x;
                        }
                }
                        else if (valueToBeSummed === 'Distance_Covered') {

                        var x = parseInt(gameRetrievalService.games[game].Distance_Covered);

                        if (gameRetrievalService.games[game].Distance_Covered !== "" && x > 0) {
                            sum += x;
                        }
                }
                        else if (valueToBeSummed === 'Offsides') {

                        var x = parseInt(gameRetrievalService.games[game].Offsides);

                        if (gameRetrievalService.games[game].Offsides !== "" && x > 0) {
                            sum += x;
                        }
                }
                        else if (valueToBeSummed === 'Earnings') {

                        var x = parseInt(gameRetrievalService.games[game].Match_Fee);

                        if (gameRetrievalService.games[game].Match_Fee !== "" && x > 0) {
                            sum += x;
                        }
                }

                        else if (valueToBeSummed === 'enjoy') {

                        var x = parseInt(gameRetrievalService.games[game].Game_Quality);

                        if (gameRetrievalService.games[game].Game_Quality !== "" && x > 0) {
                            sum += x;
                        }
                }
                        else if (valueToBeSummed === 'assess') {

                        var x = parseInt(gameRetrievalService.games[game].My_Performance);

                        if (gameRetrievalService.games[game].My_Performance !== "" && x > 0) {
                            sum += x;
                        }
                }
                        else if (valueToBeSummed === 'hours') {

                        var x = parseInt(gameRetrievalService.games[game].Game_Duration);

                        if (gameRetrievalService.games[game].Game_Duration !== "" && x > 0) {
                            sum += x;
                        }
                }
                }//end for
                return sum;
            };//end method

            function getGamesWithFrees() {
	                    var counter = 0;
	                    for (var game in gameRetrievalService.games) {
		                var x = parseInt(gameRetrievalService.games[game].Num_Frees);

                        if (x !== "" && x > 0) {
                            counter++;
                        }
            }
                        return counter;
            };
            
            function getGamesWithPens() {
	                    var counter = 0;
	                    for (var game in gameRetrievalService.games) {
		                var x = parseInt(gameRetrievalService.games[game].Num_Pens);

                        if (x !== "" && x > 0) {
                            counter++;
                        }
            }
                        return counter;
            };
    
                function getGamesWithKmsRecorded() {
	                    var counter = 0;
	                    for (var game in gameRetrievalService.games) {
		                var x = parseInt(gameRetrievalService.games[game].Distance_Covered);

                        if (x !== "" && x > 0) {
                            counter++;
                        }
            }
                        return counter;
            };
    
                    function getGamesWith(y) {
	                    var counter = 0;
	                    for (var game in gameRetrievalService.games) {
		                var x = parseInt(gameRetrievalService.games[game].y);

                        if (x !== "" && x > 0) {
                            counter++;
                        }
            }
                        return counter;
            };
    
                    function getGamesWithOffsidesRecorded() {
	                    var counter = 0;
	                    for (var game in gameRetrievalService.games) {
		                var x = parseInt(gameRetrievalService.games[game].Offsides);

                        if (x !== "" && x > 0) {
                            counter++;
                        }
            }
                        return counter;
            };
    
                        function getGamesWithAssessments() {
	                    var counter = 0;
	                    for (var game in gameRetrievalService.games) {
		                var x = parseInt(gameRetrievalService.games[game].My_Performance);

                        if (x !== "" && x > 0) {
                            counter++;
                        }
            }
                        return counter;
            };
    
                        function getGamesWithEnjoyment() {
	                    var counter = 0;
	                    for (var game in gameRetrievalService.games) {
		                var x = parseInt(gameRetrievalService.games[game].Game_Quality);

                        if (x !== "" && x > 0) {
                            counter++;
                        }
            }
                        return counter;
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

                    if (gameRetrievalService.games[game].Home_Score !== "" &&       gameRetrievalService.games[game].Away_Score !== "" && x > 0 && x > max) {
                        max = x;
                    }
                }
                return max;
            };






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