angular.module( 'ai.dashboard', [
    'ui.router'
])

    .config(function config( $stateProvider ) {
        $stateProvider.state( 'dashboard', {
            url: '/dashboard',
            views: {
                "main": {
                    controller: 'DashboardCtrl',
                    templateUrl: 'dashboard/dashboard.tpl.html'
                }
            },
            data:{ pageTitle: 'Dashboard' },
            resolve: {
                rests: function(Restaurants) {
                    return Restaurants.getAll().then(function(response) {
                        console.log('response from resolve ', response);
                        return response.data;
                    });
                },

                userList: function(Users) {
                    return Users.getAll().then(function(response) {
                        console.log('users response from resolve ', response);
                        return response.data;
                    });
                }
            }
        });
    })

    .controller( 'DashboardCtrl', function DashboardController( $scope, rests, Restaurants, $auth, Pusher, userList ) {

        $scope.newRestaurant = {};
        $scope.restaurants = rests;

        _.forEach($scope.restaurants, function (restaurant) {
            restaurant.votes = [];
        });

        console.log('$scope.restaurants ', $scope.restaurants);
        $scope.date = new Date();
        $scope.userList = userList;

        $scope.submitNewRestaurant = function (d) {
            return Restaurants.addNew(d).success(function(data) {
                console.log('data from post', data);
                $scope.restaurants = data;
            });
        };

        $scope.handleRegBtnClick = function() {
            $auth.submitRegistration($scope.registrationForm)
                .then(function(resp) {
                    return console.log('resp SIGNUP =', resp);
                })
                .catch(function(resp) {
                    // handle error response
                });
        };

        $scope.handleLoginBtnClick = function() {
            $auth.submitLogin($scope.loginForm)
                .then(function(resp) {
                    return console.log('resp LOGIN =', resp);
                })
                .catch(function(resp) {
                    return console.log('resp LOGIN catch =', resp);
                });
        };

        $scope.handleSignOutBtnClick = function() {
            $auth.signOut()
                .then(function(resp) {
                    return console.log('resp logout =', resp);
                })
                .catch(function(resp) {
                    // handle error response
                });
        };


        $scope.eventNotifications_count = 0;
        $scope.eventNotifications = [];

        /*VOTES*/

        Pusher.subscribe('votes', 'updated', function (item) {
            console.log('votes updated', item);
        });

        $scope.$on('votes:updated', function (event, notification) {
            console.log('votes:updated event notification', notification);
            $scope.eventNotifications_count++;
            $scope.eventNotifications.unshift(notification);
        });

        /*Restaurants*/

        Pusher.subscribe('restaurants', 'added', function (item) {
            console.log('item changed', item);
        });

        $scope.$on('restaurants:added', function (event, notification) {
            console.log('restaurants:added notification', notification);
            $scope.eventNotifications.push(notification);
            $scope.restaurants.unshift(notification.message);
        });

        $scope.$on('$destroy', function () {
            Pusher.unsubscribe('votes');
            console.log('Unsubscribed from votes');
            Pusher.unsubscribe('activities');
            console.log('Unsubscribed from activities');
        });

        $scope.upvote = function (id) {
            return Restaurants.upvote(id).then(function(data) {
                console.log('data from upvote', data);
            });
        }
    })


    .factory('Restaurants', function ($http) {
        var rest = {};
        var url = 'http://localhost:3000/api/restaurants';  //'https://jakt-lunch.herokuapp.com/api/restaurants';
        rest.all = [];
        rest.upvote = function (id) {
            return $http.put(url + '/' + id + '/upvote');
        };
        rest.getAll = function () {
            return $http.get(url);
        };
        rest.addNew = function (vals) {
            return $http.post(url, vals);

        };
        return rest;
    })

    .factory('Users', function ($http) {
        var rest = {};
        var url = 'http://localhost:3000/api/users';
        rest.all = [];
        rest.getAll = function () {
            return $http.get(url);
        };
        rest.addNew = function (vals) {
            return $http.post(url, vals);

        };
        return rest;
    })

;

