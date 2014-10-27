//
angular.module( 'ai', [
    'templates-app',
    'templates-common',

    'ai.common.directives.dropdown',
    'ai.common.directives.popover',
    'ai.common.services.utils',
    'ai.common.filters',
    'ai.dashboard',
    'ai.header',
    'ai.search',
    'ai.user',
    'ui.router',
    'mgcrea.ngStrap',
    'nvd3ChartDirectives',
    'ngAnimate',
    'ngSanitize',
    'ngNotificationsBar',
    'ngTable',
    'wu.masonry',
    'ng-token-auth',
    'ngCookies',
    'doowb.angular-pusher',
    'angularMoment',
    'angularCharts'

])

    .config( function myAppConfig ( $locationProvider, $popoverProvider, $stateProvider, $urlRouterProvider, $authProvider, PusherServiceProvider ) {
        $urlRouterProvider.otherwise( '/dashboard' );

        angular.extend($popoverProvider.defaults, {
            animation: 'am-fade',
            placement: 'bottom'
        });

        $authProvider.configure({
            apiUrl: 'https://jakt-lunch.herokuapp.com/api',  //'http://localhost:3000/api',  //
            handleLoginResponse: function(response) {
                return response.data;
            },
            handleAccountResponse: function(response) {
                return response.data;
            },
            handleTokenValidationResponse: function(response) {
                return response.data;
            }
        });

        PusherServiceProvider
            .setToken('84010d839c46f453dbde')
            .setOptions({});
    })

    .run( function run () {
    })

    .controller( 'AppCtrl', function AppCtrl ( $scope, $location, Restaurants ) {
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if ( angular.isDefined( toState.data.pageTitle ) ) {
                $scope.stateView = toState.data.pageTitle;

                $scope.pageTitle = toState.data.pageTitle + ' | Lunch' ;
            }
        });
    })
;
