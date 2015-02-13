(function () {
    'use strict';

    var YoutubePlayerController = function ($scope, $window, $log) {
        var youtube = {
                'ready'        : false,
                'player'       : null,
                'playerId'     : null,
                'videoId'      : null,
                'videoTitle'   : null,
                'playerHeight' : '480',
                'playerWidth'  : '640',
                'state'        : 'stopped'
            },

            onYoutubeReady = function (event) {
                $log.info('YouTube Player is ready');
            },

            onYoutubeStateChange = function (event) {
                var video;

                switch(event.data) {
                case YT.PlayerState.PLAYING:
                    youtube.state = 'playing';
                    break;

                case YT.PlayerState.PAUSED:
                    youtube.state = 'paused';
                    break;

                case YT.PlayerState.ENDED:
                    youtube.state = 'ended';
                    break;
                }
            },

            bindPlayer = function (elementId) {
                $log.info('Binding to ' + elementId);
                youtube.playerId = elementId;
            },

            createPlayer = function () {
                var playerOptions = {
                    'height': youtube.playerHeight,
                    'width' : youtube.playerWidth,

                    'playerVars': {
                        'rel': 0,
                        'showinfo': 0
                    },

                    'events': {
                        'onReady': onYoutubeReady,
                        'onStateChange': onYoutubeStateChange
                    }
                };

                $log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);

                return new YT.Player(youtube.playerId, playerOptions);
            },

            loadPlayer = function () {
                if (youtube.ready && youtube.playerId) {
                    if (youtube.player) {
                        youtube.player.destroy();
                    }
                    youtube.player = createPlayer();
                }
            };

        $window.youtubePlayerLoading.then(function () {
            $log.info('Youtube API is ready');

            youtube.ready = true;
            bindPlayer('player-insert');
            loadPlayer();
        });

        $scope.launchPlayer = function (id, title) {
            youtube.player.loadVideoById(id);
            youtube.videoId = id;
            youtube.videoTitle = title;
        };
    };

    angular.module('VideoSearch')
        .run(function ($q, $window) {
            var loading = $q.defer();

            $window.youtubePlayerLoading = loading.promise;

            $window.onYouTubeIframeAPIReady = function () {
                loading.resolve();
            };
        })
        .controller('YoutubePlayerController', YoutubePlayerController)
        .directive('youtubePlayer', function () {
            return {
                restrict: 'EA',
                controller: 'YoutubePlayerController',
                template: '<div id="player-insert"></div>',
                scope: {
                    video: '='
                },
                link: function (scope, element) {
                    scope.$watch('video', function () {
                        if (scope.video) {
                            scope.launchPlayer(scope.video.id, scope.video.title);
                            scope.videoTitle = scope.video.title;
                        }
                    });
                }
            };
        });
}(window.angular));
