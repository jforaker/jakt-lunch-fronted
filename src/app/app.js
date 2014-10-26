//
angular.module( 'ai', [
    'templates-app',
    'templates-common',

    //'ai.common.directives.container',
    'ai.common.directives.dropdown',
    //'ai.common.directives.show-hide',
    'ai.common.directives.popover',
    //'ai.common.directives.svg',

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
    'angularMoment'

])

    .config( function myAppConfig ( $locationProvider, $popoverProvider, $stateProvider, $urlRouterProvider, $authProvider, PusherServiceProvider ) {
        $urlRouterProvider.otherwise( '/dashboard' );
        $locationProvider.html5Mode(true);

        angular.extend($popoverProvider.defaults, {
            animation: 'am-fade',
            placement: 'bottom'
        });

        $authProvider.configure({
            apiUrl: 'http://localhost:3000/api'  //'https://jakt-lunch.herokuapp.com/api'
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
