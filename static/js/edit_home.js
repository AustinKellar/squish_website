
var retrieveHomeData = function() {
    $.getJSON(getLogoUrl, (response) => {
        editController.logo = response.logo;
        editController.logo_src = response.logo.logo
    });

    $.getJSON(getScreenshotUrl, (response) => {
        editController.screenshot = response.screenshot;
    });

    $.getJSON(getTrailerUrl, (response) => {
        editController.trailerUrl = response.trailer_url;
    });

    $.getJSON(getDescriptionUrl, (response) => {
        editController.description = response.description;
    });
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

var titleScreenshotChanged = function(event) {
    var input = event.target;
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.addEventListener('load', () => {
            editController.screenshot = reader.result;
        }, false);
        reader.readAsDataURL(file);
    }
};

var saveTitleScreenshot = function(event) {
    $.post(saveTitleScreenshotUrl, {
        id: editController.logo.id,
        screenshot: editController.screenshot
    }, (response) => {
        alert('Success!');
    })
};

var saveDescription = function() {
    $.post(saveDescriptionUrl, {
        id: editController.logo.id,
        description: editController.description
    }, (response) => {
        alert('Success!');
    });
}

var saveTrailer = function() {
    $.post(saveTrailerUrl, {
        id: editController.logo.id,
        trailer_url: editController.trailerUrl
    }, (response) => {
        alert('Success!');
    });
};

retrieveHomeData();