var onPageLoad = function() {
    if (window.location.pathname.toUpperCase() == '/SQUISH/DEFAULT/INDEX') {
        window.location.pathname = '/Squish';
    }
    setTimeout(() => {
        app.loaded = true;
    }, 750);
};

var setRoute = function(route) {
    app.route = route;

    if (route != 'home') {
        $('#nav-collapse').click();
    }
};

var app = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        route: 'home',
        loaded: false
    },
    methods: {
        setRoute: setRoute
    }
});

onPageLoad();