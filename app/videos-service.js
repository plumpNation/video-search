(function () {
    'use strict';

    var VideosService = function ($window, $rootScope, $log) {

        var service = this,

            youtube = {
                ready        : false,
                player       : null,
                playerId     : null,
                videoId      : null,
                videoTitle   : null,
                playerHeight : '480',
                playerWidth  : '640',
                state        : 'stopped'
            },

            results = [],

            videoList = [
            //     {id: 'kRJuY6ZDLPo', title: 'La Roux - In for the Kill (Twelves Remix)'},
            ];

        $window.onYouTubeIframeAPIReady = function () {
            $log.info('Youtube API is ready');

            youtube.ready = true;
            service.bindPlayer('placeholder');
            service.loadPlayer();

            $rootScope.$apply();
        };

        function onYoutubeReady (event) {
            $log.info('YouTube Player is ready');
        }

        function onYoutubeStateChange (event) {
            switch(event.data) {
                case YT.PlayerState.PLAYING:
                    youtube.state = 'playing';
                    break;

                case YT.PlayerState.PAUSED:
                    youtube.state = 'paused';
                    break;

                case YT.PlayerState.ENDED:
                    youtube.state = 'ended';

                    service.launchPlayer(videoList[0].id, videoList[0].title);
                    service.archiveVideo(videoList[0].id, videoList[0].title);
                    service.deleteVideo(videoList, videoList[0].id);
                    break;
            }

            $rootScope.$apply();
        }

        this.bindPlayer = function (elementId) {
            $log.info('Binding to ' + elementId);
            youtube.playerId = elementId;
        };

        this.createPlayer = function () {
            $log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
            return new YT.Player(youtube.playerId, {
                height: youtube.playerHeight,
                width: youtube.playerWidth,
                playerVars: {
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': onYoutubeReady,
                    'onStateChange': onYoutubeStateChange
                }
            });
        };

        this.loadPlayer = function () {
            if (youtube.ready && youtube.playerId) {
                if (youtube.player) {
                    youtube.player.destroy();
                }
                youtube.player = service.createPlayer();
            }
        };

        this.launchPlayer = function (id, title) {
            youtube.player.loadVideoById(id);
            youtube.videoId = id;
            youtube.videoTitle = title;

            return youtube;
        };

        this.listResults = function (data) {
            results.length = 0;

            for (var i = data.items.length - 1; i >= 0; i--) {
                results.push({
                    id          : data.items[i].id.videoId,
                    title       : data.items[i].snippet.title,
                    description : data.items[i].snippet.description,
                    thumbnail   : data.items[i].snippet.thumbnails.default.url,
                    author      : data.items[i].snippet.channelTitle
                });
            }

            return results;
        };

        this.queueVideo = function (id, title) {
            videoList.push({
                id: id,
                title: title
            });

            return videoList;
        };

        this.deleteVideo = function (id) {
            videoList = videoList.filter(function (video) {
                return video.id !== id;
            });
        };

        this.getYoutube = function () {
            return youtube;
        };

        this.getResults = function () {
            return results;
        };

        this.getUpcoming = function () {
            return videoList;
        };

    };

    angular.module('VideoSearch').service('VideosService', VideosService);
}(window.angular));
