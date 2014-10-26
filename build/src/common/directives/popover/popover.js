angular.module('ai.common.directives.popover', [])

    .directive('aiPopover', function($popover, $timeout, $rootScope) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, elem, attrs) {
                var options = {
                    template: attrs.template,
                    prefixEvent: attrs.template,
                    scope: scope // set the scope; otherwise the service will create a new one off of $rootScope
                };

                if (attrs.placement) {
                    options.placement = attrs.placement;
                }

                var popover = $popover(elem, options),

                    handler = function(event) {
                        var $target = $(event.target);
                        console.log('$target ', $target);
                        if (!$target.parents('.form-login').length || $target.hasClass('add-rest') || $target.hasClass('fa-plus-circle')) {
                            popover.hide();
                        }
                    };

                $rootScope.$on(attrs.template + '.show', function() {
                    console.log('showing')
                    $(document).on('click', handler);
                });

                $rootScope.$on(attrs.template + '.hide', function() {
                    $(document).off('click', handler);
                });

            }
        };
    })

    ;