angular.module('ai.search', [])

    .directive('aiContainer', function($timeout) {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                scope.$on('search:open', function() {
                    elem.addClass('ai-search-open');

                    $timeout(function(){
                        $(document).on('click', function(event) {
                            var menu = 'ai-search',
                                $target = $(event.target),
                                inSidebar = $target.parents('.' + menu).length || $target.hasClass(menu);

                            if (!inSidebar) {
                                elem.removeClass('ai-search-open');
                                $(document).off('click');
                            }
                        });
                    });
                });
            }
        };
    })
    ;