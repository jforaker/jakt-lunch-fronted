angular.module('ai.common.directives.show-hide', [])

    .directive('aiShowHide', function aiShowHide() {
        return {
            restrict: 'E',
            templateUrl: 'directives/show-hide/show-hide.tpl.html'
        };
    })

    ;