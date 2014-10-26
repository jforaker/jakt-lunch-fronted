angular.module('ai.common.directives.svg', [])

    .directive('aiSvg', function(utils, $timeout) {
        return {
            restrict: 'E',
            scope: {
                ref: '@',
                'class': '@',
                styles: '@'
            },
            link: function(scope, elem, attrs) {
                if (scope.styles) {
                    $timeout(function() {
                        var hash = utils.hash(scope.styles),
                            styles = angular.fromJson(scope.styles),
                            orig = $(scope.ref),
                            newElem = orig.after(orig.clone());

                        newElem.attr('id', orig.attr('id') + hash);
                        scope.ref = '#' + newElem.attr('id');

                        _.each(styles, function(css, key) {
                            var el = newElem.find(key);

                            _.each(css, function(style) {
                                el.css(style);
                            });
                        });
                    });
                }
            },
            templateUrl: 'directives/svg/svg.tpl.html'
        };
    })

    ;