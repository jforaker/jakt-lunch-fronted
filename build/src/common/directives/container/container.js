angular.module('ai.common.directives.container', [])

    .directive('aiContainer', function aiContainer($timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, elem, attrs) {
                scope.visible = true;
            }
        };
    })

    ;