angular.module( 'ai.common.filters', [])

    .filter('hoursMinutesSeconds', function() {
        // Convert seconds to hh:mm:ss; including leading zeros where necessary
        return function(totalSeconds) {
            var hours = parseInt( totalSeconds / 3600, 10) % 24;
            var minutes = parseInt( totalSeconds / 60, 10) % 60;
            var seconds = totalSeconds % 60;

            return [hours, minutes, seconds].map(function(val) {
                return (val < 10) ? "0" + val : val;
            }).join(':');
        };
    })

    ;