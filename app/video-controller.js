(function () {
    'use strict';

    var VideosController = function ($scope, $http, $log, YoutubeService, VideosService) {

        init();

        function init() {
            $scope.youtube = VideosService.getYoutube();
            $scope.results = VideosService.getResults();
            $scope.upcoming = VideosService.getUpcoming();
            $scope.history = VideosService.getHistory();
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
            VideosService.archiveVideo(id, title);
            VideosService.deleteVideo($scope.upcoming, id);

            $log.info('Launched id:' + id + ' and title:' + title);
        };

        $scope.queue = function (id, title) {
            VideosService.queueVideo(id, title);
            VideosService.deleteVideo($scope.history, id);

            $log.info('Queued id:' + id + ' and title:' + title);
        };

        $scope.delete = function (list, id) {
            VideosService.deleteVideo(list, id);
        };

        $scope.search = function () {
            YoutubeService.search(this.query)
                .then(onYoutubeServiceLoad, onYoutubeServiceError);
        };

        $scope.tabulate = function (state) {
            $scope.playlist = state;
        };
    };

    angular.module('VideoSearch').controller('VideosController', VideosController);
}(window.angular));
