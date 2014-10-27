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

    .controller( 'DashboardCtrl', function DashboardController( $scope, $timeout, $rootScope, rests, Restaurants, $auth, Pusher, userList ) {

        $scope.showSignup = false;
        $scope.showSignupTrue = function () {
            $scope.showSignup = !$scope.showSignup;
        };
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
                console.log('data from add new', data);
                $scope.restaurants = data;
            });
        };

        $scope.handleRegBtnClick = function() {
            $auth.submitRegistration($scope.registrationForm)
                .then(function(resp) {
                    return console.log('resp SIGNUP =', resp);
                })
                .catch(function () {
                    
                })
        };
        $rootScope.$on("auth:registration-email-success", function (data) {
            $scope.user.signedIn = true;
        });

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
            viewCount(notification.restaurant.id);
            chartData.pushData(notification.restaurant.id, notification.vote);
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
            Pusher.unsubscribe('restaurants');
            console.log('Unsubscribed from restaurants');
        });

        var viewCount = function (id) {
            console.log('id =', id);
            angular.forEach($scope.restaurants, function (rest) {
                if(rest.id == id){
                    rest.votes.push(id);
                }
            });

        };

        $scope.upvote = function (id) {
            return Restaurants.upvote(id).then(function(data) {
                console.log('data from upvote', data);
            });
        };

        $scope.downvote = function (id) {
            return Restaurants.downvote(id).then(function(data) {
                console.log('data from downvote', data);
            });
        };

        $scope.config = {
            title: 'Restaurants',
            tooltips: false,
            labels: true,
            "legend": {
                "display": true,
                "position": "right"
            },
            "innerRadius": 0,
            "lineLegend": "lineEnd"
            
        };

        var chartData = {
            getRestaurants: function () {
                var obj = {};
                obj.objects = function () {
                    var arr = [];
                    angular.forEach($scope.restaurants, function (rest) {
                        arr.push({
                            x: rest.name,
                            y: []
                        })
                    });
                    console.log('arr ', arr);
                    return arr;
                };
                obj.series = function () {
                    var arr = [];
                    angular.forEach($scope.restaurants, function (rest) {
                        arr.push(rest.name)
                    });
                    console.log('series ', arr);
                    return arr;
                };
                return obj;
            },
            pushData: function (id, vote) {
                $scope.data.data[id - 1].y.splice(0, 1, vote);
                console.log('$scope.data.data[0].y ', $scope.data.data);
            }
        };

        $scope.data = {
            series: chartData.getRestaurants().series(),
            data: chartData.getRestaurants().objects()
        };
    })


    .factory('Restaurants', function ($http) {
        var rest = {};
        var url = 'http://localhost:3000/api/restaurants';  //'https://jakt-lunch.herokuapp.com/api/restaurants';
        rest.all = [];
        rest.upvote = function (id) {
            return $http.put(url + '/' + id + '/upvote');
        };
        rest.downvote = function (id) {
            return $http.put(url + '/' + id + '/downvote');
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

