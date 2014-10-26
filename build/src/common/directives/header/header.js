angular.module('ai.header', [])

    .controller('HeaderCtrl', function($rootScope, $scope, Restaurants) {
        $scope.search = function() {
            $scope.$emit('search:open');
        };

        $scope.selectTab = function(tab) {
            $scope.tab = {};
            $scope.tab[tab] = true;
            console.log('scope tab', $scope.tab);

        };

        $scope.submitNewRestaurant = function (d) {

            Restaurants.addNew(d);
            console.log('d ', d );
//            $rootScope

        };

    })

;