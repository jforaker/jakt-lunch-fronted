angular.module('ai.common.directives.spark-line', [])

    .directive('aiSparkLine', function aiSparkLine() {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@'
            },
            templateUrl: 'directives/spark-line/spark-line.tpl.html'
        };
    })
    ;