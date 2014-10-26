angular.module('ai.timer', [])

    .directive('aiTimer', function(Timer) {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                var colors = {
                    gold: '#ffd90d',
                    green: '#74c155',
                    red: '#d12626',
                    cornflower: '#3f9ddd',
                    orange: '#f39939',
                    purple: '#b934ca'
                };

                scope.timer = Timer;

                scope.$watch('timer.agenda.color', function(color) {
                    $('#ai-timer-dot').find('circle[id$="inside"]').attr('fill', colors[color]);
                });
            },
            templateUrl: 'directives/timer/timer.tpl.html'
        };
    })

    .factory('Timer', function($interval) {
        var timer = {
                agenda: {},
                timer: {} // holds promise
            },
            pingCounter;

        timer.init = function(agenda) {
            if (timer.timer.$$intervalId) {
                $interval.cancel(timer.timer);
                timer.timer = {};
            }

            timer.agenda = agenda;
            timer.toggle();
            pingCounter = 60;
        };

        timer.toggle = function() {
            if(!timer.timer.$$intervalId) { // start
                timer.state = 'running';

                timer.timer = $interval(function() {
                    if (timer.agenda.timeleft === 0) {
                        timer.complete();
                    } else {
                        timer.agenda.timeleft -= 1;
                    }

                    if (pingCounter === 0) {
                        timer.ping();
                        pingCounter = 60;
                    } else {
                        pingCounter -= 1;
                    }
                }, 1000);
            } else { // pause
                $interval.cancel(timer.timer);
                timer.timer = {};
            }
        };

        timer.complete = function() {
            $interval.cancel(timer.timer);
            timer.timer = {};
            timer.agenda.timeleft = 0;
        };

        timer.ping = function() {
            // Ping / update server w/ elapsed time
            console.log('ping!');
        };

        return timer;
    })

    ;