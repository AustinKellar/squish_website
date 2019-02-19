var processPlaytests = function() {
    let i = 0;
    app.playtests.map((playtest) => {
        playtest.index = i++;
    });
};

var processTeamMembers = function() {
    let i = 0;
    app.teamMembers.map((member) => {
        member.index = i++;
    });
};

var onPageLoad = function() {
    if (window.location.pathname.toUpperCase() == '/SQUISH/DEFAULT/INDEX') {
        window.location.pathname = '/Squish';
    }

    $.getJSON(getPlaytestsUrl, (response) => {
        app.playtests = response.playtests;
        $('#app-content').show();
        $('#spinner').hide();
        window.scrollTo(0, 0);
        processPlaytests();
    });

    $.getJSON(getTeamMembersUrl, (response) => {
        app.teamMembers = response.team_members;
        processTeamMembers();
    });
};

var setRoute = function(route) {
    app.route = route;

    if (route != 'home') {
        window.scrollTo(0, 0);
        $('#nav-collapse').click();
    }
};

var showSpinner = function(time) {
    $('#app-content').hide();
    $('#spinner').show();
    setTimeout(() => {
        $('#app-content').show();
        $('#spinner').hide();
    }, time);
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
        playtests: [],
        teamMembers: []
    },
    methods: {
        setRoute: setRoute,
        openImage: openImage,
        showSpinner: showSpinner
    }
});

onPageLoad();