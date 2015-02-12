(function () {
    'use strict';

    var VideoSearchController = function ($scope, $http, $log, YoutubeService, VideosService) {

        init();

        function init() {
            $scope.youtube = VideosService.getYoutube();
            $scope.results = VideosService.getResults();
            $scope.upcoming = VideosService.getUpcoming();
            $scope.playlist = true;
        }

        function onYoutubeServiceLoad(data) {
            VideosService.listResults(data);
            $log.info(data);
        }

        function onYoutubeServiceError(error) {
            $log.error('Youtube error', error);
        }

        $scope.launch = function (id, title) {
            VideosService.launchPlayer(id, title);
            VideosService.deleteVideo(id);

            $log.info('Launched id:' + id + ' and title:' + title);
        };

        $scope.queue = function (id, title) {
            VideosService.queueVideo(id, title);
            $scope.launchPlayer(id, title);

            $log.info('Queued id:' + id + ' and title:' + title);
        };

        $scope.delete = function (listname, id) {
            VideosService.deleteVideo(id);
        };

        $scope.search = function () {
            YoutubeService.search(this.query)
                .then(onYoutubeServiceLoad, onYoutubeServiceError);
        };

        $scope.tabulate = function (state) {
            $scope.playlist = state;
        };
    };

    angular.module('VideoSearch').controller('VideoSearchController', VideoSearchController);
}(window.angular));
