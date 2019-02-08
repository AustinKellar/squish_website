var changeRoute = function(route) {
    editController.route = route;
};

var editController = new Vue({
    el: '#edit',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        // home assets
        homePageAssets: undefined,
        logo: undefined,
        description: undefined,
        titleScreenshot: undefined,
        trailerUrl: undefined,

        // media
        allMedia: [],
        mediaCaption: undefined,
        mediaPicture: undefined,

        // playtests
        playtests: [],
        playtestTitle: undefined,
        playtestImage: undefined,
        playtestDate: undefined,
        playtestTime: undefined,
        playtestLocation: undefined,
        playtestTagline: undefined,
        playtestDescription: undefined,

        // general
        route: 'home',
        showSpinner: true
    },
    methods: {
        // home assets
        logoChanged: logoChanged,
        saveLogo: saveLogo,
        saveTrailer: saveTrailer,
        titleScreenshotChanged: titleScreenshotChanged,
        saveTitleScreenshot: saveTitleScreenshot,
        saveDescription: saveDescription,

        // media
        saveMedia: saveMedia,
        deleteMedia: deleteMedia,
        mediaPictureChanged: mediaPictureChanged,

        // playtests
        savePlaytest: savePlaytest,
        deletePlaytest: deletePlaytest,

        // general
        changeRoute: changeRoute
    }
});