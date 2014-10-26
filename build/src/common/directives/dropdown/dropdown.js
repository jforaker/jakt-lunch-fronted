angular.module('ai.common.directives.dropdown', [])

    .directive('aiDropdown', function() {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                list: '='
            },
            link: function(scope, elem, attrs, ngModel) {

                var data = [];

                _.each(scope.list, function (item) {
                    data.push({
                        'text': item,
                        'click': 'setter('+item+')'
                    });
                });

                scope.setter = function (val) {
                    scope.ngModel = val;
                };
                scope.data = data;

                scope.$watch(function () {
                    return ngModel.$modelValue;
                }, function() {
                    scope.selected = scope.ngModel;
                });
            },
            template: '<button type="button" class="btn-dropdown full-width" bs-dropdown="data" html="true"> {{selected}} </button>'
        };
    })

    ;