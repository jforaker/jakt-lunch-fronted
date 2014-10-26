angular.module( 'ai.user', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'user', {
    url: '/user',
    views: {
      "main": {
        controller: 'UserCtrl',
        templateUrl: 'user/user.tpl.html'
      }
    },
    data:{ pageTitle: 'User' }
  })
  .state('login', {
    url: '/login',
    views: {
      "main": {
        controller: 'UserLoginCtrl',
        templateUrl: 'user/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'UserCtrl', function UserController( $scope ) {
})

.controller( 'UserLoginCtrl', function UserController( $scope ) {
})

;

