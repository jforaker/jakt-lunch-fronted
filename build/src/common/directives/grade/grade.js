angular.module('ai.common.directives.grade', [])

    .directive('aiGrade', function aiGrade() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'directives/grade/grade.tpl.html'
        };
    })

    ;