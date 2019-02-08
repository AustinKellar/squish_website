var changeRoute = function(route) {
    editController.route = route;
};

var editController = new Vue({
    el: '#edit',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        // home assets
        logo: undefined,
        logo_src: undefined,
        description: undefined,
        screenshot: undefined,
        trailerUrl: undefined,

        // media
        screenshots: [],
        caption: undefined,
        selectedScreenshot: undefined,

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
        route: 'home'
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
        saveScreenshot: saveScreenshot,
        deleteScreenshot: deleteScreenshot,

        // playtests
        savePlaytest: savePlaytest,
        deletePlaytest: deletePlaytest,

        // general
        changeRoute: changeRoute
    }
});