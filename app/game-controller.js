app.controller('GameController', function ($scope, $timeout, GameService) {
	
    //Create two card variables to keep track of the current selections
    $scope.card1 = null;
    $scope.card2 = null;
    //Add to $scope a way to track number of guesses, and total matches
    $scope.attempts = 0;
    $scope.totalMatches = 0;
    $scope.victory = false;
	
    //This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    $scope.deck = GameService.getDeck();
	
    //Write a function that accepts a card object on click.
    $scope.selectCard = function (card) {
        if (card.show != true) {
            card.show = true;
            if ($scope.card1 === null) {
                // if neither card is set
                $scope.card1 = card;
                return;
            } else if ($scope.card2 === null) {
                // if the first card is set
                $scope.card2 = card;
                if ($scope.isMatch($scope.card1, $scope.card2)) {
                    $scope.checkVictory();
                    $scope.resetCards();
                };
                var card1 = $scope.card1;
                var card2 = $scope.card2;
                $timeout(function () {
                    if (card1) card1.show = false;
                    if (card2) card2.show = false;
                }, 1000);
                $scope.resetCards();
                return;
            };
        };
    };
    //Before assingning card1 or card2 check to make sure both cards are falsey 
    //This function should set either card1 or card2 depending on the order of selection
    //set card.show to true
    //if this is card 1 then return to short circut the function
    //if card2 and card2 isMatch of card 1 then resetCards() increase the totalMatches and checkVictory()
    //otherwise this is where we will need to use $timeout with a delay of 1000 
    //set card1.show = false
    //card2.show = false
    //resetCards() 
	
	
    //write a function to resetCards
    //it will empty the two card variables above and increase the number of attempts
    $scope.resetCards = function () {
        $scope.card1 = null;
        $scope.card2 = null;
        $scope.attempts++;
    };
	
	
    //write a checkVictory function that will set $scope.victory = true if the totalMatches is half the length of the deck
    $scope.checkVictory = function () {
        if ($scope.totalMatches >= ($scope.deck.length / 2)) {
            $scope.victory = true;
        } else {
            $scope.victory = false;
        }
    }
    
    //write an isMatch function that accepts two cards and returns true or false if the card titles match.
    $scope.isMatch = function (x, y) {
        if (x.title === y.title) {
            $scope.totalMatches++;
            return true;
        } else {
            return false;
        }
    }
	
    //Bonus: Write a function that can reset the game
    $scope.reset = function () {
        $scope.victory = false;
        $scope.card1 = null;
        $scope.card2 = null;
        $scope.attempts = 0;
        $scope.totalMatches = 0;
        $scope.deck = GameService.getDeck();
    }

});