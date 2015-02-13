(function () {
    'use strict';

    var VideoSearchController = function ($scope, $http, $log, YoutubeService) {
        var videoList = VideoList.create();

        function init() {
            $scope.results = [];
        }

        function onYoutubeServiceLoad(data) {
            $scope.results = SearchHelper.normalizeResults(data);
            $log.info(data);
        }

        function onYoutubeServiceError(error) {
            $log.error('Youtube error', error);
        }

        function updateSelectedVideos() {
            $scope.playlist = videoList.get();
        }

        // @todo move this to the playlist
        $scope.launch = function (video) {
            $scope.selectedVideo = video;

            $log.info('Launched id:' + video.id + ' and title:' + video.title);
        };

        $scope.select = function (id, title) {
            videoList.set(id, title);

            updateSelectedVideos();

            $scope.launch(videoList.get(id));

            $log.info('Queued id:' + id + ' and title:' + title);
        };

        $scope.deselect = function (listname, id) {
            videoList.remove(id);
            $scope.playlist = videoList.get();
        };

        $scope.search = function () {
            YoutubeService.search(this.query)
                .then(onYoutubeServiceLoad, onYoutubeServiceError);
        };

        $scope.tabulate = function (state) {
            $scope.playlist = state;
        };

        init();
    };

    angular.module('VideoSearch').controller('VideoSearchController', VideoSearchController);
}(window.angular));
