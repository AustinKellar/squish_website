var processInfo = function() {
    var i = 0;
    app.playtests.map((playtest) => {
        playtest.index = i++;
    });
};

var onPageLoad = function() {
    if (window.location.pathname.toUpperCase() == '/SQUISH/DEFAULT/INDEX') {
        window.location.pathname = '/Squish';
    }
    setTimeout(() => {
        $('#app-content').show();
        $('#spinner').hide();
    }, 750);

    $.getJSON(getPlaytestsUrl, (response) => {
        app.playtests = response.playtests;
        processInfo();
    });
};

var setRoute = function(route) {
    app.route = route;

    if (route != 'home') {
        $('#nav-collapse').click();
    }
};

var openImage = function(url) {
    var win = window.open();
    win.document.write('<iframe src="' + url  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
};

var app = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        route: 'home',
        loaded: false,
        playtests: []
    },
    methods: {
        setRoute: setRoute,
        openImage: openImage
    }
});

onPageLoad();