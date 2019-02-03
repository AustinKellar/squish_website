var onPageLoad = function() {
    if (window.location.pathname.toUpperCase() == '/SQUISH/DEFAULT/INDEX') {
        window.location.pathname = '/Squish';
    }
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
    },
    methods: {
        setRoute: setRoute
    }
});

onPageLoad();