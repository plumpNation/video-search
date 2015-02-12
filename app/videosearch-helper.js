(function () {
    /**
     * A singleton of pure static functions to ease working on the video list data.
     */
    var SearchHelper = {
        normalizeResults: function (results) {
            var normalize = function (result) {
                    return {
                        'id'          : result.id.videoId,
                        'title'       : result.snippet.title,
                        'description' : result.snippet.description,
                        'thumbnail'   : result.snippet.thumbnails.default.url,
                        'author'      : result.snippet.channelTitle
                    };
                },

                normalized = results.items.map(normalize);

            return normalized;
        }
    };

    window.SearchHelper = SearchHelper;
}());
