app.controller('GameController', function ($scope, $timeout, GameService) {
    $scope.card1 = null;
    $scope.card2 = null;
    $scope.attempts = 0;
    $scope.totalMatches = 0;
    $scope.victory = false;
    $scope.deck = GameService.getDeck();

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

    $scope.resetCards = function () {
        $scope.card1 = null;
        $scope.card2 = null;
        $scope.attempts++;
    };

    $scope.checkVictory = function () {
        if ($scope.totalMatches >= ($scope.deck.length / 2)) {
            $scope.victory = true;
        } else {
            $scope.victory = false;
        }
    }

    $scope.isMatch = function (x, y) {
        if (x.title === y.title) {
            $scope.totalMatches++;
            return true;
        } else {
            return false;
        }
    }

    $scope.reset = function () {
        $scope.victory = false;
        $scope.card1 = null;
        $scope.card2 = null;
        $scope.attempts = 0;
        $scope.totalMatches = 0;
        $scope.deck = GameService.getDeck();
    }

});