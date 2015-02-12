(function () {
    'use strict';

    angular.module('VideoSearch', [])
        .config(function ($httpProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        });
}(window.angular));
