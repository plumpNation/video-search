(function () {
    'use strict';

    angular.module('VideoSearch')
        .directive('videosearch', function () {
            return {
                restrict: 'AE',
                scope: {},
                templateUrl: './videosearch-directive.html',
                controller: 'VideoSearchController'
            };
        });
}(window.angular));
