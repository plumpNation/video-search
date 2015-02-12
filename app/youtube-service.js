(function (angular) {
    'use strict';

    var youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search',

        YoutubeService = function ($resource, $log, CONFIG) {
            var _maxResults = '8',
                youtubeApi = $resource(youtubeApiUrl);

            /**
             * @param {number} numResults
             */
            this.setMaxResults = function (numResults) {
                _maxResults = numResults.toString();
            };

            /**
             * @param {string} query
             * @return {object} $resource
             */
            this.search = function (query) {
                return youtubeApi.get({
                    q           : query,
                    key         : CONFIG.googleApiKey,
                    type        : 'video',
                    maxResults  : _maxResults,
                    part        : 'id,snippet',

                    fields: [
                        'items/id',
                        'items/snippet/title',
                        'items/snippet/description',
                        'items/snippet/thumbnails/default',
                        'items/snippet/channelTitle'
                    ].join(',')
                }).$promise;
            };
        };

    angular.module('VideoSearch').service('YoutubeService', YoutubeService);

}(window.angular));
