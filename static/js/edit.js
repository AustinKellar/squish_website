var retrieveInitialData = function() {
    $.getJSON(getLogoUrl, (response) => {
        editController.logo = response.logo;
        editController.logo_src = response.logo.logo
    });

    $.getJSON(getTrailerUrl, (response) => {
        editController.trailerUrl = response.trailer_url;
    })
};

var logoChanged = function(event) {
    var input = event.target;
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.addEventListener('load', () => {
            editController.logo.logo = reader.result;
            editController.logo_src = reader.result
        }, false);
        reader.readAsDataURL(file);
    }
};

var saveLogo = function() {
    $.post(saveLogoUrl, {
        id: editController.logo.id,
        logo: editController.logo.logo
    }, (response) => {
        alert('Success!');
    });
};

var saveTrailer = function() {
    $.post(saveTrailerUrl, {
        id: editController.logo.id,
        trailer_url: editController.trailerUrl
    }, (response) => {
        alert('Success!');
    });
}

var editController = new Vue({
    el: '#edit',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        logo: undefined,
        logo_src: undefined,
        trailerUrl: undefined
    },
    methods: {
        logoChanged: logoChanged,
        saveLogo: saveLogo,
        saveTrailer: saveTrailer
    }
});

retrieveInitialData();