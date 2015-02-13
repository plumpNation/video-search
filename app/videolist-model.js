(function () {
    'use strict';

    function VideoList() {
        if (!this instanceof VideoList) {
            return new VideoList();
        }

        this.init();
    }

    VideoList.create = function () {
        var newVideoList = Object.create(VideoList.prototype);

        newVideoList.init();

        return newVideoList;
    };

    VideoList.prototype.init = function () {
        this.videos = {};
    };

    VideoList.prototype.remove = function (videoId) {
        this.videos = this.videos.filter(function (video) {
            return video.id === videoId;
        });

        return this;
    };

    /**
     * @param {string} videoId
     */
    VideoList.prototype.get = function (videoId) {
        if (!videoId) {
            return this.videos;
        }

        return this.videos[videoId] || null;
    };

    /**
     * @param {string} videoId
     * @param {object} videoTitle
     */
    VideoList.prototype.set = function (videoId, videoTitle) {
        if (!videoId || !videoTitle) {
            throw new Error('Seriously, read the source.');
        }

        this.videos[videoId] = {
            id: videoId,
            title: videoTitle
        };

        return this;
    };

    window.VideoList = VideoList;
}());
