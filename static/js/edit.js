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
        updatedPlaytest: undefined,

        // general
        route: 'home',
        showSpinner: true
    },
    methods: {
        // home assets
        logoChanged: undefined,
        saveLogo: undefined,
        saveTrailer: undefined,
        titleScreenshotChanged: undefined,
        saveTitleScreenshot: undefined,
        saveDescription: undefined,

        // media
        saveMedia: undefined,
        deleteMedia: undefined,
        mediaPictureChanged: undefined,
        specificMediaChanged: undefined,
        updateMedia: undefined,

        // playtests
        savePlaytest: undefined,
        deletePlaytest: undefined,
        playtestChanged: undefined,
        updatePlaytest: undefined,
        updatedPlaytestChanged: undefined,

        // general
        changeRoute: changeRoute
    }
});